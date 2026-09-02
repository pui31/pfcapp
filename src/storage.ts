import type { Pfc, Quantity } from './domain'

export type FoodLog = { id: string; foodId: string; foodName: string; icon: string; quantity: Quantity; normalAmountLabel: string; pfc: Pfc; createdAt: string; dateKey: string }
const storageKey = 'pfcapp-kids-mvp-logs-v1'

export function loadLogs(): FoodLog[] {
  try {
    const value = localStorage.getItem(storageKey)
    const parsed: unknown = value ? JSON.parse(value) : []
    return Array.isArray(parsed) ? parsed as FoodLog[] : []
  } catch { return [] }
}
export function saveLogs(logs: FoodLog[]) { localStorage.setItem(storageKey, JSON.stringify(logs)) }
