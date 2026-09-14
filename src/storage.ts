import type { Pfc, Quantity } from './domain'
import type { FoodCategory } from './data/foodMaster'

export type FoodLog = { id: string; foodId: string; foodName: string; icon: string; quantity: Quantity; normalAmountLabel: string; pfc: Pfc; createdAt: string; dateKey: string }
const storageKey = 'pfcapp-kids-mvp-logs-v1'
const userFoodStorageKey = 'pfcapp-kids-user-foods-v1'

export type SelectableFood = {
  id: string
  name: string
  category: FoodCategory
  subcategory: string
  icon: string
  amounts: { normalLabel: string }
  quantityMultipliers: Pick<Record<Quantity, number>, 'small' | 'large'>
  normalNutrition: Pfc & { kcal?: number }
  isUser?: true
}

export type UserFood = SelectableFood & {
  isUser: true
  createdAt: string
  updatedAt: string
}

export function loadLogs(): FoodLog[] {
  try {
    const value = localStorage.getItem(storageKey)
    const parsed: unknown = value ? JSON.parse(value) : []
    return Array.isArray(parsed) ? parsed as FoodLog[] : []
  } catch { return [] }
}
export function saveLogs(logs: FoodLog[]) { localStorage.setItem(storageKey, JSON.stringify(logs)) }

function isUserFood(value: unknown): value is UserFood {
  if (!value || typeof value !== 'object') return false
  const food = value as Partial<UserFood>
  const nutrition = food.normalNutrition as Partial<Pfc> | undefined
  const multipliers = food.quantityMultipliers as Partial<Record<Quantity, number>> | undefined
  return food.isUser === true
    && typeof food.id === 'string' && food.id.startsWith('user-food-')
    && typeof food.name === 'string'
    && typeof food.category === 'string'
    && typeof food.subcategory === 'string'
    && typeof food.icon === 'string'
    && typeof food.amounts?.normalLabel === 'string'
    && typeof nutrition?.P === 'number' && typeof nutrition.F === 'number' && typeof nutrition.C === 'number'
    && typeof multipliers?.small === 'number' && typeof multipliers.large === 'number'
    && typeof food.createdAt === 'string' && typeof food.updatedAt === 'string'
}

export function loadUserFoods(): UserFood[] {
  try {
    const value = localStorage.getItem(userFoodStorageKey)
    const parsed: unknown = value ? JSON.parse(value) : []
    return Array.isArray(parsed) ? parsed.filter(isUserFood) : []
  } catch { return [] }
}

export function saveUserFoods(foods: UserFood[]) {
  localStorage.setItem(userFoodStorageKey, JSON.stringify(foods))
}
