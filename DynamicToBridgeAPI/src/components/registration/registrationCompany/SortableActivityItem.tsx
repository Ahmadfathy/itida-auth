import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface ActivityItem {
  id: string
  name: string
  priority: number
  selected: boolean
}

interface SortableActivityItemProps {
  activity: ActivityItem
  onToggle: (activityId: string) => void
  language: string
  translations: any
}

const SortableActivityItem: React.FC<SortableActivityItemProps> = ({
  activity,
  onToggle,
  language,
  translations
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getActivityTranslation = (activityId: string) => {
    const translationMap: { [key: string]: string } = {
      'softwareDesign': translations.softwareDesignServices,
      'itSystems': translations.itSystemsServices,
      'trustServices': translations.trustServices,
      'websitesPlatforms': translations.websitesPlatformsServices,
      'electronicsEmbedded': translations.electronicsEmbeddedServices,
      'contentDigitization': translations.contentDigitizationServices,
      'callCenterBusiness': translations.callCenterBusinessServices,
      'consultingResearch': translations.consultingResearchServices,
      'trainingLearning': translations.trainingLearningServices,
    }
    return translationMap[activityId] || activity.name
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-lg border transition-all duration-200 ${
        activity.selected 
          ? 'bg-blue-50 border-blue-200 shadow-sm' 
          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
      } ${isDragging ? 'shadow-lg z-50' : ''}`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex flex-col items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
        title={language === 'ar' ? 'اسحب لإعادة الترتيب' : 'Drag to reorder'}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      </div>

      {/* Priority Badge */}
      {activity.selected && (
        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white text-sm font-bold rounded-full">
          {activity.priority}
        </div>
      )}

      {/* Checkbox */}
      <input
        type="checkbox"
        checked={activity.selected}
        onChange={() => onToggle(activity.id)}
        className="h-4 w-4 text-itida-blue focus:ring-itida-blue border-gray-300 rounded"
      />

      {/* Activity Name */}
      <span className={`text-sm flex-1 ${
        activity.selected ? 'text-gray-900 font-medium' : 'text-gray-700'
      }`}>
        {getActivityTranslation(activity.id)}
      </span>

      {/* Priority Label (only for selected items) */}
      {activity.selected && (
        <span className="text-xs text-blue-600 font-medium">
          {language === 'ar' ? `الأولوية ${activity.priority}` : `Priority ${activity.priority}`}
        </span>
      )}
    </div>
  )
}

export default SortableActivityItem
