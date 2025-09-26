import React from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import SortableActivityItem from './SortableActivityItem'

interface ActivityItem {
  id: string
  name: string
  priority: number
  selected: boolean
}

interface SortableActivitiesListProps {
  activities: ActivityItem[]
  onActivitiesChange: (activities: ActivityItem[]) => void
  language: string
  translations: any
}

const SortableActivitiesList: React.FC<SortableActivitiesListProps> = ({
  activities,
  onActivitiesChange,
  language,
  translations
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = activities.findIndex(item => item.id === active.id)
      const newIndex = activities.findIndex(item => item.id === over.id)

      const newActivities = arrayMove(activities, oldIndex, newIndex)
      
      // Update priorities for selected activities only
      const updatedActivities = newActivities.map((item, index) => ({
        ...item,
        priority: item.selected ? index + 1 : item.priority
      }))

      onActivitiesChange(updatedActivities)
    }
  }

  const handleToggleActivity = (activityId: string) => {
    const updatedActivities = activities.map(activity => {
      if (activity.id === activityId) {
        const newSelected = !activity.selected
        return {
          ...activity,
          selected: newSelected,
          priority: newSelected ? 0 : activity.priority // Will be recalculated
        }
      }
      return activity
    })

    // Recalculate priorities for selected activities
    const selectedActivities = updatedActivities.filter(activity => activity.selected)
    const finalActivities = updatedActivities.map(activity => {
      if (activity.selected) {
        const priority = selectedActivities.findIndex(selected => selected.id === activity.id) + 1
        return { ...activity, priority }
      }
      return activity
    })

    onActivitiesChange(finalActivities)
  }

  const selectedActivities = activities.filter(activity => activity.selected)
  const unselectedActivities = activities.filter(activity => !activity.selected)

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2 rtl:space-x-reverse">
          <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">
              {language === 'ar' ? 'كيفية إعادة ترتيب الأنشطة:' : 'How to reorder activities:'}
            </p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>{language === 'ar' ? 'اختر الأنشطة المطلوبة' : 'Select the activities you need'}</li>
              <li>{language === 'ar' ? 'اسحب الأنشطة المحددة لإعادة ترتيبها حسب الأولوية' : 'Drag selected activities to reorder by priority'}</li>
              <li>{language === 'ar' ? 'الرقم الأزرق يوضح ترتيب الأولوية' : 'The blue number shows priority order'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Selected Activities (Sortable) */}
      {selectedActivities.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-md font-semibold text-gray-800 flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {language === 'ar' ? 'الأنشطة المحددة (يمكن إعادة ترتيبها)' : 'Selected Activities (Reorderable)'}
          </h4>
          
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={selectedActivities.map(activity => activity.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {selectedActivities.map(activity => (
                  <SortableActivityItem
                    key={activity.id}
                    activity={activity}
                    onToggle={handleToggleActivity}
                    language={language}
                    translations={translations}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {/* Unselected Activities */}
      {unselectedActivities.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-md font-semibold text-gray-800 flex items-center">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {language === 'ar' ? 'الأنشطة المتاحة' : 'Available Activities'}
          </h4>
          
          <div className="space-y-2">
            {unselectedActivities.map(activity => (
              <SortableActivityItem
                key={activity.id}
                activity={activity}
                onToggle={handleToggleActivity}
                language={language}
                translations={translations}
              />
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {selectedActivities.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-green-800 font-medium">
              {language === 'ar' 
                ? `تم تحديد ${selectedActivities.length} نشاط بترتيب الأولوية` 
                : `${selectedActivities.length} activities selected with priority order`
              }
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default SortableActivitiesList
