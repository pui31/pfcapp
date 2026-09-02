import type { Pfc, Quantity } from '../domain'

export type FoodCategory = '主食' | 'おかず' | '野菜・果物' | 'おやつ' | 'その他'
export type Food = {
  id: string
  name: string
  category: FoodCategory
  subcategory: string
  icon: string
  normalAmountLabel: string
  normalPfc: Pfc
  quantityMultipliers?: Partial<Record<Quantity, number>>
}

export const categoryTabs: { name: FoodCategory; icon: string }[] = [
  { name: '主食', icon: '🍚' }, { name: 'おかず', icon: '🥩' }, { name: '野菜・果物', icon: '🍅' }, { name: 'おやつ', icon: '🍪' }, { name: 'その他', icon: '🍲' },
]

// TEMPORARY MVP DATA: formal food master data will replace this isolated list.
export const temporaryFoodMaster: Food[] = [
  { id: 'rice', name: 'ごはん', category: '主食', subcategory: '🍚 ごはん', icon: '🍚', normalAmountLabel: '茶碗1杯くらい', normalPfc: { P: 4, F: 0.5, C: 55 } },
  { id: 'bread', name: '食パン', category: '主食', subcategory: '🍞 パン', icon: '🍞', normalAmountLabel: '1枚くらい', normalPfc: { P: 5, F: 3, C: 28 } },
  { id: 'udon', name: 'うどん', category: '主食', subcategory: '🍜 めん', icon: '🍜', normalAmountLabel: '1杯くらい', normalPfc: { P: 7, F: 2, C: 55 } },
  { id: 'salmon', name: 'さけ', category: 'おかず', subcategory: '🐟 お魚', icon: '🐟️', normalAmountLabel: '1切れくらい', normalPfc: { P: 18, F: 7, C: 0 } },
  { id: 'chicken', name: 'とり肉', category: 'おかず', subcategory: '🥩 お肉', icon: '🍗', normalAmountLabel: '手のひら1枚くらい', normalPfc: { P: 20, F: 5, C: 0 } },
  { id: 'egg', name: 'ゆで卵', category: 'おかず', subcategory: '🥚 たまご', icon: '🥚', normalAmountLabel: '1個くらい', normalPfc: { P: 6, F: 5, C: 0.3 } },
  { id: 'fried-potato', name: 'ポテトフライ', category: 'おかず', subcategory: '🍟 揚げ物', icon: '🍟', normalAmountLabel: '小皿1つくらい', normalPfc: { P: 3, F: 12, C: 30 } },
  { id: 'broccoli', name: 'ブロッコリー', category: '野菜・果物', subcategory: '🥦 野菜', icon: '🥦', normalAmountLabel: '小鉢1つくらい', normalPfc: { P: 4, F: 0.5, C: 5 } },
  { id: 'banana', name: 'バナナ', category: '野菜・果物', subcategory: '🍌 果物', icon: '🍌', normalAmountLabel: '1本くらい', normalPfc: { P: 1, F: 0.2, C: 23 } },
  { id: 'cookie', name: 'クッキー', category: 'おやつ', subcategory: '🍪 おかし', icon: '🍪', normalAmountLabel: '4枚くらい', normalPfc: { P: 3, F: 10, C: 30 } },
  { id: 'icecream', name: 'アイス', category: 'おやつ', subcategory: '🍨 おかし', icon: '🍨', normalAmountLabel: 'カップ1つくらい', normalPfc: { P: 4, F: 8, C: 25 } },
  { id: 'miso-soup', name: 'みそしる', category: 'その他', subcategory: '🍲 スープ', icon: '🥣', normalAmountLabel: 'おわん1杯くらい', normalPfc: { P: 3, F: 2, C: 5 } },
]
