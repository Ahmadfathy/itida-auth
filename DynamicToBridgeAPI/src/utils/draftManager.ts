import { CompanyInfo, ContactInfo } from '../api/client'

export interface DraftData {
  company?: Partial<CompanyInfo>
  contacts?: { [contactId: string]: Partial<ContactInfo> }
  timestamp: number
}

export interface RetryQueueItem {
  id: string
  type: 'company' | 'contact'
  accountId: string
  contactId?: string
  data: any
  retryCount: number
  lastAttempt: number
}

class DraftManager {
  private readonly DRAFT_PREFIX = 'company_draft_'
  private readonly RETRY_QUEUE_KEY = 'retry_queue'
  private readonly MAX_RETRIES = 3
  private readonly RETRY_DELAYS = [1000, 5000, 15000] // 1s, 5s, 15s

  // Draft management
  saveDraft(accountId: string, company?: Partial<CompanyInfo>, contacts?: { [contactId: string]: Partial<ContactInfo> }): void {
    try {
      const draft: DraftData = {
        company,
        contacts,
        timestamp: Date.now()
      }
      localStorage.setItem(`${this.DRAFT_PREFIX}${accountId}`, JSON.stringify(draft))
    } catch (error) {
      console.warn('Failed to save draft:', error)
    }
  }

  loadDraft(accountId: string): DraftData | null {
    try {
      const draftStr = localStorage.getItem(`${this.DRAFT_PREFIX}${accountId}`)
      if (!draftStr) return null
      
      const draft = JSON.parse(draftStr) as DraftData
      // Check if draft is not too old (24 hours)
      if (Date.now() - draft.timestamp > 24 * 60 * 60 * 1000) {
        this.clearDraft(accountId)
        return null
      }
      
      return draft
    } catch (error) {
      console.warn('Failed to load draft:', error)
      return null
    }
  }

  clearDraft(accountId: string): void {
    try {
      localStorage.removeItem(`${this.DRAFT_PREFIX}${accountId}`)
    } catch (error) {
      console.warn('Failed to clear draft:', error)
    }
  }

  hasDraft(accountId: string): boolean {
    return this.loadDraft(accountId) !== null
  }

  // Retry queue management
  addToRetryQueue(item: Omit<RetryQueueItem, 'id' | 'retryCount' | 'lastAttempt'>): void {
    try {
      const queue = this.getRetryQueue()
      const newItem: RetryQueueItem = {
        ...item,
        id: `${item.type}_${item.accountId}_${item.contactId || 'company'}_${Date.now()}`,
        retryCount: 0,
        lastAttempt: 0
      }
      queue.push(newItem)
      this.saveRetryQueue(queue)
    } catch (error) {
      console.warn('Failed to add to retry queue:', error)
    }
  }

  getRetryQueue(): RetryQueueItem[] {
    try {
      const queueStr = localStorage.getItem(this.RETRY_QUEUE_KEY)
      return queueStr ? JSON.parse(queueStr) : []
    } catch (error) {
      console.warn('Failed to get retry queue:', error)
      return []
    }
  }

  saveRetryQueue(queue: RetryQueueItem[]): void {
    try {
      localStorage.setItem(this.RETRY_QUEUE_KEY, JSON.stringify(queue))
    } catch (error) {
      console.warn('Failed to save retry queue:', error)
    }
  }

  removeFromRetryQueue(itemId: string): void {
    try {
      const queue = this.getRetryQueue()
      const filtered = queue.filter(item => item.id !== itemId)
      this.saveRetryQueue(filtered)
    } catch (error) {
      console.warn('Failed to remove from retry queue:', error)
    }
  }

  getRetryableItems(): RetryQueueItem[] {
    const queue = this.getRetryQueue()
    const now = Date.now()
    
    return queue.filter(item => {
      if (item.retryCount >= this.MAX_RETRIES) return false
      
      const delay = this.RETRY_DELAYS[item.retryCount] || this.RETRY_DELAYS[this.RETRY_DELAYS.length - 1]
      return now - item.lastAttempt >= delay
    })
  }

  markRetryAttempt(itemId: string, success: boolean): void {
    try {
      const queue = this.getRetryQueue()
      const item = queue.find(i => i.id === itemId)
      if (!item) return

      if (success) {
        // Remove from queue on success
        this.removeFromRetryQueue(itemId)
      } else {
        // Increment retry count
        item.retryCount++
        item.lastAttempt = Date.now()
        this.saveRetryQueue(queue)
      }
    } catch (error) {
      console.warn('Failed to mark retry attempt:', error)
    }
  }

  // Auto-save functionality
  private autoSaveTimeouts: { [key: string]: number } = {}

  scheduleAutoSave(accountId: string, company?: Partial<CompanyInfo>, contacts?: { [contactId: string]: Partial<ContactInfo> }): void {
    // Clear existing timeout
    if (this.autoSaveTimeouts[accountId]) {
      clearTimeout(this.autoSaveTimeouts[accountId])
    }

    // Schedule new auto-save
    this.autoSaveTimeouts[accountId] = setTimeout(() => {
      this.saveDraft(accountId, company, contacts)
      delete this.autoSaveTimeouts[accountId]
    }, 2000) // Auto-save after 2 seconds of inactivity
  }

  cancelAutoSave(accountId: string): void {
    if (this.autoSaveTimeouts[accountId]) {
      clearTimeout(this.autoSaveTimeouts[accountId])
      delete this.autoSaveTimeouts[accountId]
    }
  }
}

export const draftManager = new DraftManager()
