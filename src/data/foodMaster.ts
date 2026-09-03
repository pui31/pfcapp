// Generated from data/food-master/PFCApp_foodmaster.csv. Do not edit by hand.
// Run: node scripts/generate-food-master.mjs

import type { Pfc, Quantity } from '../domain'

export type FoodCategory = '主食' | 'おかず' | '野菜・果物' | 'おやつ' | 'その他'

export type Food = {
  id: string
  name: string
  category: FoodCategory
  subcategory: string
  icon: string
  amounts: {
    normalInternal: string
    smallInternal: string
    largeInternal: string
    normalLabel: string
  }
  quantityMultipliers: Pick<Record<Quantity, number>, 'small' | 'large'>
  normalNutrition: Pfc & { kcal: number }
  source: { basis: string; url: string; confidence: string; note: string }
}

export const categoryTabs: { name: FoodCategory; icon: string }[] = [
  { name: '主食', icon: '🍚' }, { name: 'おかず', icon: '🥩' }, { name: '野菜・果物', icon: '🍅' }, { name: 'おやつ', icon: '🍪' }, { name: 'その他', icon: '🍲' },
]

export const foodMaster: Food[] = [
  {
    "id": "food-1",
    "name": "お米",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🍚",
    "amounts": {
      "normalInternal": "110g",
      "smallInternal": "60g",
      "largeInternal": "200g",
      "normalLabel": "1杯くらい"
    },
    "quantityMultipliers": {
      "small": 0.545,
      "large": 1.818
    },
    "normalNutrition": {
      "kcal": 172,
      "P": 2.8,
      "F": 0.3,
      "C": 40.8
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "炊飯後"
    }
  },
  {
    "id": "food-2",
    "name": "とりそぼろごはん",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🍚",
    "amounts": {
      "normalInternal": "お米110g+そぼろ80g",
      "smallInternal": "お米60g+そぼろ50g",
      "largeInternal": "お米200g+そぼろ150g",
      "normalLabel": "1杯くらい"
    },
    "quantityMultipliers": {
      "small": 0.58,
      "large": 1.75
    },
    "normalNutrition": {
      "kcal": 360,
      "P": 21,
      "F": 12,
      "C": 43
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "手作り鶏ひき肉のそぼろ"
    }
  },
  {
    "id": "food-3",
    "name": "食パン",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🍞",
    "amounts": {
      "normalInternal": "10枚切り2枚",
      "smallInternal": "1枚",
      "largeInternal": "3枚",
      "normalLabel": "2枚くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 200,
      "P": 7.2,
      "F": 3.5,
      "C": 36.8
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "ペストプライスしあわせのもっちり仕込み"
    }
  },
  {
    "id": "food-4",
    "name": "チーズ食パン",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🍞",
    "amounts": {
      "normalInternal": "食パン10枚切り2枚+レッドチェダーチーズ2枚",
      "smallInternal": "食パン10枚切り1枚+レッドチェダーチーズ1枚",
      "largeInternal": "食パン10枚切り3枚+レッドチェダーチーズ3枚",
      "normalLabel": "2枚くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 300,
      "P": 15,
      "F": 13,
      "C": 34
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": ""
    }
  },
  {
    "id": "food-5",
    "name": "チョコジャム食パン",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🍞",
    "amounts": {
      "normalInternal": "食パン10枚切り2枚+チョコソース＆ジャム",
      "smallInternal": "食パン10枚切り1枚+チョコソース＆ジャム",
      "largeInternal": "食パン10枚切り3枚+チョコソース＆ジャム",
      "normalLabel": "2枚くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 300,
      "P": 7,
      "F": 7,
      "C": 53
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "チョコとジャムはパン一枚あたりの半分ずつで"
    }
  },
  {
    "id": "food-6",
    "name": "チョコスティックパン",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🍞",
    "amounts": {
      "normalInternal": "2本",
      "smallInternal": "1本",
      "largeInternal": "3本",
      "normalLabel": "2本くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 220,
      "P": 5,
      "F": 8,
      "C": 33
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "パスコ 十勝バターチョコスティック 6本基準"
    }
  },
  {
    "id": "food-7",
    "name": "菓子パン",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🍞",
    "amounts": {
      "normalInternal": "1個",
      "smallInternal": "1/2個",
      "largeInternal": "2個",
      "normalLabel": "1個くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 350,
      "P": 7,
      "F": 14,
      "C": 49
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "一般的な菓子パン"
    }
  },
  {
    "id": "food-8",
    "name": "ナン",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🫓",
    "amounts": {
      "normalInternal": "2枚",
      "smallInternal": "1枚",
      "largeInternal": "3枚",
      "normalLabel": "2枚くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 320,
      "P": 9,
      "F": 6,
      "C": 57
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "日本ハムナーン5枚入り"
    }
  },
  {
    "id": "food-9",
    "name": "クロワッサン",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🥐",
    "amounts": {
      "normalInternal": "1個",
      "smallInternal": "1/2個",
      "largeInternal": "2個",
      "normalLabel": "1個くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 300,
      "P": 6,
      "F": 17,
      "C": 32
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "一般的なお店のクロワッサン（大きめ）"
    }
  },
  {
    "id": "food-10",
    "name": "ピザ",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🍕",
    "amounts": {
      "normalInternal": "1枚",
      "smallInternal": "1/2枚",
      "largeInternal": "2枚",
      "normalLabel": "1枚くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 142,
      "P": 5,
      "F": 4.7,
      "C": 19.8
    },
    "source": {
      "basis": "メーカー公式",
      "url": "https://www.nipponham.co.jp/products/processed_foods/bread_pizza/2656/",
      "confidence": "高",
      "note": "石窯工房®Mini あら挽きソーセージ 3枚入り"
    }
  },
  {
    "id": "food-11",
    "name": "炊き込みご飯",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🍚",
    "amounts": {
      "normalInternal": "110g",
      "smallInternal": "60g",
      "largeInternal": "200g",
      "normalLabel": "1杯くらい"
    },
    "quantityMultipliers": {
      "small": 0.545,
      "large": 1.818
    },
    "normalNutrition": {
      "kcal": 180,
      "P": 4.5,
      "F": 1.5,
      "C": 38
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "一般的な鶏ごぼう炊き込みご飯"
    }
  },
  {
    "id": "food-12",
    "name": "おにぎり",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🍙",
    "amounts": {
      "normalInternal": "110g",
      "smallInternal": "60g",
      "largeInternal": "170g",
      "normalLabel": "1個くらい"
    },
    "quantityMultipliers": {
      "small": 0.545,
      "large": 1.545
    },
    "normalNutrition": {
      "kcal": 180,
      "P": 4,
      "F": 1.5,
      "C": 38
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "一般的な炊き込みご飯系おにぎり"
    }
  },
  {
    "id": "food-13",
    "name": "玉子おすし",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🍣",
    "amounts": {
      "normalInternal": "4巻",
      "smallInternal": "2巻",
      "largeInternal": "6巻",
      "normalLabel": "2皿くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 240,
      "P": 10,
      "F": 5,
      "C": 39
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "はま寿司うまだし玉子基準"
    }
  },
  {
    "id": "food-14",
    "name": "オムライス",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🍽️",
    "amounts": {
      "normalInternal": "180g",
      "smallInternal": "100g",
      "largeInternal": "250g",
      "normalLabel": "1杯くらい"
    },
    "quantityMultipliers": {
      "small": 0.556,
      "large": 1.389
    },
    "normalNutrition": {
      "kcal": 330,
      "P": 12,
      "F": 9,
      "C": 50
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "手作りケチャップオムライス玉子1個（炒め油ほぼなし）"
    }
  },
  {
    "id": "food-15",
    "name": "チャーハン",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🍚",
    "amounts": {
      "normalInternal": "180g",
      "smallInternal": "100g",
      "largeInternal": "250g",
      "normalLabel": "1杯くらい"
    },
    "quantityMultipliers": {
      "small": 0.556,
      "large": 1.389
    },
    "normalNutrition": {
      "kcal": 300,
      "P": 9,
      "F": 8,
      "C": 49
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "手作りチャーハン（炒め油ほぼなし）"
    }
  },
  {
    "id": "food-16",
    "name": "麻婆豆腐丼",
    "category": "主食",
    "subcategory": "🍚 主食",
    "icon": "🍚",
    "amounts": {
      "normalInternal": "280g",
      "smallInternal": "180g",
      "largeInternal": "350g",
      "normalLabel": "1杯くらい"
    },
    "quantityMultipliers": {
      "small": 0.643,
      "large": 1.25
    },
    "normalNutrition": {
      "kcal": 430,
      "P": 18,
      "F": 14,
      "C": 57
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "手作り麻婆豆腐（炒め油ほぼなし）"
    }
  },
  {
    "id": "food-17",
    "name": "うどん",
    "category": "主食",
    "subcategory": "🍜 めん",
    "icon": "🍜",
    "amounts": {
      "normalInternal": "200g",
      "smallInternal": "100g",
      "largeInternal": "300g",
      "normalLabel": "はまっこうどん2杯"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 220,
      "P": 6,
      "F": 1,
      "C": 48
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "具材なし・だしと醤油のスープ込"
    }
  },
  {
    "id": "food-18",
    "name": "おうちラーメン",
    "category": "主食",
    "subcategory": "🍜 めん",
    "icon": "🍜",
    "amounts": {
      "normalInternal": "1.1食",
      "smallInternal": "0.7食",
      "largeInternal": "1.5食",
      "normalLabel": "1食くらい"
    },
    "quantityMultipliers": {
      "small": 0.636,
      "large": 1.364
    },
    "normalNutrition": {
      "kcal": 400,
      "P": 12,
      "F": 14,
      "C": 55
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "マルちゃん正麺醤油味（袋麺）基準"
    }
  },
  {
    "id": "food-19",
    "name": "おみせラーメン",
    "category": "主食",
    "subcategory": "🍜 めん",
    "icon": "🍜",
    "amounts": {
      "normalInternal": "1杯",
      "smallInternal": "0.7杯",
      "largeInternal": "1.2杯",
      "normalLabel": "1杯くらい"
    },
    "quantityMultipliers": {
      "small": 0.7,
      "large": 1.2
    },
    "normalNutrition": {
      "kcal": 450,
      "P": 20,
      "F": 15,
      "C": 60
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "一般的なすっきりめのお店醤油ラーメン（通常サイズ）"
    }
  },
  {
    "id": "food-20",
    "name": "赤パスタ",
    "category": "主食",
    "subcategory": "🍜 めん",
    "icon": "🍝",
    "amounts": {
      "normalInternal": "1食",
      "smallInternal": "0.8食",
      "largeInternal": "1.2食",
      "normalLabel": "1食くらい"
    },
    "quantityMultipliers": {
      "small": 0.8,
      "large": 1.2
    },
    "normalNutrition": {
      "kcal": 600,
      "P": 24,
      "F": 18,
      "C": 82
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "ミートソースパスタ1食=乾麺100g"
    }
  },
  {
    "id": "food-21",
    "name": "白パスタ",
    "category": "主食",
    "subcategory": "🍜 めん",
    "icon": "🍝",
    "amounts": {
      "normalInternal": "1食",
      "smallInternal": "0.8食",
      "largeInternal": "1.2食",
      "normalLabel": "1食くらい"
    },
    "quantityMultipliers": {
      "small": 0.8,
      "large": 1.2
    },
    "normalNutrition": {
      "kcal": 750,
      "P": 25,
      "F": 35,
      "C": 85
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "ドナ カルボナーラ基準"
    }
  },
  {
    "id": "food-22",
    "name": "からあげ",
    "category": "おかず",
    "subcategory": "🍟 揚げ物",
    "icon": "🍗",
    "amounts": {
      "normalInternal": "150g",
      "smallInternal": "80g",
      "largeInternal": "250g",
      "normalLabel": "大きめで4個くらい"
    },
    "quantityMultipliers": {
      "small": 0.533,
      "large": 1.667
    },
    "normalNutrition": {
      "kcal": 435,
      "P": 36,
      "F": 27,
      "C": 21
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "概算",
      "note": "一般的なスーパー惣菜"
    }
  },
  {
    "id": "food-23",
    "name": "とり天",
    "category": "おかず",
    "subcategory": "🍟 揚げ物",
    "icon": "🍗",
    "amounts": {
      "normalInternal": "150g",
      "smallInternal": "80g",
      "largeInternal": "250g",
      "normalLabel": "4個くらい"
    },
    "quantityMultipliers": {
      "small": 0.533,
      "large": 1.667
    },
    "normalNutrition": {
      "kcal": 471,
      "P": 32.9,
      "F": 24,
      "C": 28.2
    },
    "source": {
      "basis": "ユーザー提供100g栄養値",
      "url": "",
      "confidence": "高",
      "note": "100gあたり熱量314kcalたんぱく質21.9g脂質16.0g炭水化物18.8g"
    }
  },
  {
    "id": "food-24",
    "name": "チキンスティック",
    "category": "おかず",
    "subcategory": "🍟 揚げ物",
    "icon": "🍗",
    "amounts": {
      "normalInternal": "165g",
      "smallInternal": "80g",
      "largeInternal": "260g",
      "normalLabel": "5本くらい"
    },
    "quantityMultipliers": {
      "small": 0.485,
      "large": 1.576
    },
    "normalNutrition": {
      "kcal": 430,
      "P": 35,
      "F": 24,
      "C": 28
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "概算",
      "note": "一般的な鶏むね肉フライドチキン"
    }
  },
  {
    "id": "food-25",
    "name": "ナゲット",
    "category": "おかず",
    "subcategory": "🍟 揚げ物",
    "icon": "🍗",
    "amounts": {
      "normalInternal": "5個",
      "smallInternal": "3個",
      "largeInternal": "6個",
      "normalLabel": "5個くらい"
    },
    "quantityMultipliers": {
      "small": 0.6,
      "large": 1.2
    },
    "normalNutrition": {
      "kcal": 270,
      "P": 15,
      "F": 17,
      "C": 14
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "概算",
      "note": "マックチキンナゲット"
    }
  },
  {
    "id": "food-26",
    "name": "ポテト",
    "category": "おかず",
    "subcategory": "🍟 揚げ物",
    "icon": "🍟",
    "amounts": {
      "normalInternal": "Mサイズx0.8",
      "smallInternal": "Sサイズ",
      "largeInternal": "Mサイズ",
      "normalLabel": "Mサイズをちょっと分けたくらい"
    },
    "quantityMultipliers": {
      "small": 0.55,
      "large": 1.25
    },
    "normalNutrition": {
      "kcal": 328,
      "P": 4,
      "F": 16,
      "C": 41
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "概算",
      "note": "マックフライドポテト"
    }
  },
  {
    "id": "food-27",
    "name": "とりそぼろ",
    "category": "おかず",
    "subcategory": "🥩 お肉",
    "icon": "🐓",
    "amounts": {
      "normalInternal": "80g",
      "smallInternal": "50g",
      "largeInternal": "120g",
      "normalLabel": "ごはん1杯分くらい"
    },
    "quantityMultipliers": {
      "small": 0.625,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 180,
      "P": 16,
      "F": 11,
      "C": 5
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "手作り鶏ひき肉のそぼろ"
    }
  },
  {
    "id": "food-28",
    "name": "豚肉",
    "category": "おかず",
    "subcategory": "🥩 お肉",
    "icon": "🐖",
    "amounts": {
      "normalInternal": "80g",
      "smallInternal": "30g",
      "largeInternal": "120g",
      "normalLabel": "1皿くらい"
    },
    "quantityMultipliers": {
      "small": 0.375,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 146,
      "P": 17.6,
      "F": 8,
      "C": 0.2
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "豚もも肉"
    }
  },
  {
    "id": "food-29",
    "name": "牛肉",
    "category": "おかず",
    "subcategory": "🥩 お肉",
    "icon": "🐂",
    "amounts": {
      "normalInternal": "80g",
      "smallInternal": "30g",
      "largeInternal": "120g",
      "normalLabel": "1皿くらい"
    },
    "quantityMultipliers": {
      "small": 0.375,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 160,
      "P": 17,
      "F": 10,
      "C": 0.3
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "牛もも肉"
    }
  },
  {
    "id": "food-30",
    "name": "ハム",
    "category": "おかず",
    "subcategory": "🥩 お肉",
    "icon": "🥓",
    "amounts": {
      "normalInternal": "2枚",
      "smallInternal": "1枚",
      "largeInternal": "4枚",
      "normalLabel": "2枚くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 70,
      "P": 7,
      "F": 5,
      "C": 1
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "ロースハム"
    }
  },
  {
    "id": "food-31",
    "name": "鮭",
    "category": "おかず",
    "subcategory": "🐟 お魚",
    "icon": "🐟",
    "amounts": {
      "normalInternal": "80g",
      "smallInternal": "60g",
      "largeInternal": "120g",
      "normalLabel": "1切れくらい"
    },
    "quantityMultipliers": {
      "small": 0.75,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 180,
      "P": 18,
      "F": 10,
      "C": 5
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "西京焼き"
    }
  },
  {
    "id": "food-32",
    "name": "サバ",
    "category": "おかず",
    "subcategory": "🐟 お魚",
    "icon": "🐟",
    "amounts": {
      "normalInternal": "130g",
      "smallInternal": "80g",
      "largeInternal": "200g",
      "normalLabel": "1切れくらい"
    },
    "quantityMultipliers": {
      "small": 0.615,
      "large": 1.538
    },
    "normalNutrition": {
      "kcal": 330,
      "P": 27,
      "F": 24,
      "C": 0.5
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "塩焼き"
    }
  },
  {
    "id": "food-33",
    "name": "その他",
    "category": "おかず",
    "subcategory": "🐟 お魚",
    "icon": "🐟",
    "amounts": {
      "normalInternal": "80g",
      "smallInternal": "30g",
      "largeInternal": "120g",
      "normalLabel": "1切れくらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 180,
      "P": 18,
      "F": 11,
      "C": 1
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "さんまとか"
    }
  },
  {
    "id": "food-34",
    "name": "卵焼き",
    "category": "おかず",
    "subcategory": "🥚 たまご",
    "icon": "🥚",
    "amounts": {
      "normalInternal": "卵2個分",
      "smallInternal": "卵1個分",
      "largeInternal": "卵3個分",
      "normalLabel": "卵2個分くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 220,
      "P": 12.5,
      "F": 11,
      "C": 20
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "概算",
      "note": "調理油1ml、鶏卵、砂糖卵1個につき小さじ1.5杯"
    }
  },
  {
    "id": "food-35",
    "name": "ゆで卵",
    "category": "おかず",
    "subcategory": "🥚 たまご",
    "icon": "🥚",
    "amounts": {
      "normalInternal": "卵2個分",
      "smallInternal": "卵1個分",
      "largeInternal": "卵3個分",
      "normalLabel": "卵2個分くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 34,
      "P": 7.2,
      "F": 0.1,
      "C": 0.5
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "概算",
      "note": "白身のみ"
    }
  },
  {
    "id": "food-36",
    "name": "チョコレート",
    "category": "おやつ",
    "subcategory": "🍪 おかし",
    "icon": "🍫",
    "amounts": {
      "normalInternal": "33g",
      "smallInternal": "12g",
      "largeInternal": "66g",
      "normalLabel": "1箱の半分くらい"
    },
    "quantityMultipliers": {
      "small": 0.364,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 183,
      "P": 3,
      "F": 10.5,
      "C": 21
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "概算",
      "note": "たけのこの里基準"
    }
  },
  {
    "id": "food-37",
    "name": "バニラアイス",
    "category": "おやつ",
    "subcategory": "🍪 おかし",
    "icon": "🍨",
    "amounts": {
      "normalInternal": "100ml",
      "smallInternal": "80ml",
      "largeInternal": "200ml",
      "normalLabel": "1個の半分くらい"
    },
    "quantityMultipliers": {
      "small": 0.8,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 187,
      "P": 2.8,
      "F": 11.7,
      "C": 17.7
    },
    "source": {
      "basis": "メーカー公式",
      "url": "https://www.meiji.co.jp/products/icecream/4902705125308.html",
      "confidence": "高",
      "note": "エッセルスーパーカップバニラ基準"
    }
  },
  {
    "id": "food-38",
    "name": "クッキー",
    "category": "おやつ",
    "subcategory": "🍪 おかし",
    "icon": "🍪",
    "amounts": {
      "normalInternal": "2枚",
      "smallInternal": "1枚",
      "largeInternal": "4枚",
      "normalLabel": "2枚くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 92,
      "P": 1.2,
      "F": 4.6,
      "C": 12.4
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "概算",
      "note": "ムーンライト基準"
    }
  },
  {
    "id": "food-39",
    "name": "ビスコ",
    "category": "おやつ",
    "subcategory": "🍪 おかし",
    "icon": "🍪",
    "amounts": {
      "normalInternal": "1袋",
      "smallInternal": "1袋の半分",
      "largeInternal": "2袋",
      "normalLabel": "1袋くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 105,
      "P": 1.1,
      "F": 4.9,
      "C": 14.6
    },
    "source": {
      "basis": "メーカー公式",
      "url": "https://www.glico.com/jp/product/snack_biscuit_cookie/bisco/47546/",
      "confidence": "高",
      "note": "1袋5枚入り"
    }
  },
  {
    "id": "food-40",
    "name": "パピコ",
    "category": "おやつ",
    "subcategory": "🍪 おかし",
    "icon": "🍧",
    "amounts": {
      "normalInternal": "45ml",
      "smallInternal": "30ml",
      "largeInternal": "80ml",
      "normalLabel": "小さいの1本くらい"
    },
    "quantityMultipliers": {
      "small": 0.667,
      "large": 1.778
    },
    "normalNutrition": {
      "kcal": 55,
      "P": 1,
      "F": 2,
      "C": 8.3
    },
    "source": {
      "basis": "メーカー公式（現行80ml/本を45ml換算）",
      "url": "https://www.glico.com/jp/product/ice/papico/47539/",
      "confidence": "概算",
      "note": "パピコチョココーヒー基準"
    }
  },
  {
    "id": "food-41",
    "name": "ポテトチップス",
    "category": "おやつ",
    "subcategory": "🍪 おかし",
    "icon": "🥔",
    "amounts": {
      "normalInternal": "30g",
      "smallInternal": "15g",
      "largeInternal": "65g",
      "normalLabel": "1袋の半分くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 2.167
    },
    "normalNutrition": {
      "kcal": 162,
      "P": 1.5,
      "F": 10.5,
      "C": 16.5
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "概算",
      "note": "一般的な塩味のポテトチップス"
    }
  },
  {
    "id": "food-42",
    "name": "クレープ",
    "category": "おやつ",
    "subcategory": "🍪 おかし",
    "icon": "🍰",
    "amounts": {
      "normalInternal": "2/3個",
      "smallInternal": "1/2個",
      "largeInternal": "1個",
      "normalLabel": "少し大人に分けたくらい"
    },
    "quantityMultipliers": {
      "small": 0.75,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 300,
      "P": 6,
      "F": 12,
      "C": 42
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "概算",
      "note": "一般的なチョコバナナクレープ"
    }
  },
  {
    "id": "food-43",
    "name": "ホットケーキ",
    "category": "おやつ",
    "subcategory": "🍪 おかし",
    "icon": "🥞",
    "amounts": {
      "normalInternal": "200g",
      "smallInternal": "100g",
      "largeInternal": "300g",
      "normalLabel": "2枚くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 500,
      "P": 10,
      "F": 15,
      "C": 80
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "概算",
      "note": "焼いた状態の量・チョコソースがけ"
    }
  },
  {
    "id": "food-44",
    "name": "ゼリー",
    "category": "おやつ",
    "subcategory": "🍪 おかし",
    "icon": "🥣",
    "amounts": {
      "normalInternal": "1個",
      "smallInternal": "1/2個",
      "largeInternal": "2個",
      "normalLabel": "1個くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 90,
      "P": 1,
      "F": 0.2,
      "C": 22
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "概算",
      "note": "一般的なみかんゼリー基準"
    }
  },
  {
    "id": "food-45",
    "name": "キウイ",
    "category": "野菜・果物",
    "subcategory": "🥝 果物",
    "icon": "🥝",
    "amounts": {
      "normalInternal": "1個",
      "smallInternal": "1/2個",
      "largeInternal": "2個",
      "normalLabel": "1個くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 60,
      "P": 1.1,
      "F": 0.2,
      "C": 15
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "ゴールデンキウイ"
    }
  },
  {
    "id": "food-46",
    "name": "バナナ",
    "category": "野菜・果物",
    "subcategory": "🥝 果物",
    "icon": "🍌",
    "amounts": {
      "normalInternal": "1本",
      "smallInternal": "1/2本",
      "largeInternal": "2本",
      "normalLabel": "1本くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 93,
      "P": 1.1,
      "F": 0.2,
      "C": 22.5
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": ""
    }
  },
  {
    "id": "food-47",
    "name": "ぶどう",
    "category": "野菜・果物",
    "subcategory": "🥝 果物",
    "icon": "🍇",
    "amounts": {
      "normalInternal": "10粒",
      "smallInternal": "5粒",
      "largeInternal": "15粒",
      "normalLabel": "10粒くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 60,
      "P": 0.4,
      "F": 0.1,
      "C": 15.5
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": ""
    }
  },
  {
    "id": "food-48",
    "name": "いちご",
    "category": "野菜・果物",
    "subcategory": "🥝 果物",
    "icon": "🍓",
    "amounts": {
      "normalInternal": "5粒",
      "smallInternal": "3粒",
      "largeInternal": "10粒",
      "normalLabel": "5粒くらい"
    },
    "quantityMultipliers": {
      "small": 0.6,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 50,
      "P": 1,
      "F": 0.2,
      "C": 12
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": ""
    }
  },
  {
    "id": "food-49",
    "name": "りんご",
    "category": "野菜・果物",
    "subcategory": "🥝 果物",
    "icon": "🍎",
    "amounts": {
      "normalInternal": "1/2個",
      "smallInternal": "1/4個",
      "largeInternal": "1個",
      "normalLabel": "1個の半分くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 70,
      "P": 0.2,
      "F": 0.2,
      "C": 19
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": ""
    }
  },
  {
    "id": "food-50",
    "name": "すいか",
    "category": "野菜・果物",
    "subcategory": "🥝 果物",
    "icon": "🍉",
    "amounts": {
      "normalInternal": "250g",
      "smallInternal": "170g",
      "largeInternal": "350g",
      "normalLabel": "小さめの1パックくらい"
    },
    "quantityMultipliers": {
      "small": 0.68,
      "large": 1.4
    },
    "normalNutrition": {
      "kcal": 103,
      "P": 1.5,
      "F": 0.3,
      "C": 23.8
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": ""
    }
  },
  {
    "id": "food-51",
    "name": "オレンジ",
    "category": "野菜・果物",
    "subcategory": "🥝 果物",
    "icon": "🍊",
    "amounts": {
      "normalInternal": "1/2個",
      "smallInternal": "1/4個",
      "largeInternal": "1個",
      "normalLabel": "1個の半分くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 45,
      "P": 0.9,
      "F": 0.1,
      "C": 11
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": ""
    }
  },
  {
    "id": "food-52",
    "name": "みかん",
    "category": "野菜・果物",
    "subcategory": "🥝 果物",
    "icon": "🍊",
    "amounts": {
      "normalInternal": "1個",
      "smallInternal": "1/2個",
      "largeInternal": "2個",
      "normalLabel": "1個くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 2
    },
    "normalNutrition": {
      "kcal": 49,
      "P": 0.7,
      "F": 0.1,
      "C": 12
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": ""
    }
  },
  {
    "id": "food-53",
    "name": "その他",
    "category": "野菜・果物",
    "subcategory": "🥝 果物",
    "icon": "🥭",
    "amounts": {
      "normalInternal": "100g",
      "smallInternal": "50g",
      "largeInternal": "200g",
      "normalLabel": "100gくらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 55,
      "P": 0.7,
      "F": 0.2,
      "C": 14
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "何か……一般的なフルーツ……"
    }
  },
  {
    "id": "food-54",
    "name": "もやしサラダ",
    "category": "野菜・果物",
    "subcategory": "🍅 野菜",
    "icon": "🌱",
    "amounts": {
      "normalInternal": "200g",
      "smallInternal": "100g",
      "largeInternal": "300g",
      "normalLabel": "少し大人に分けたくらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 60,
      "P": 4,
      "F": 2,
      "C": 6
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": ""
    }
  },
  {
    "id": "food-55",
    "name": "枝豆",
    "category": "野菜・果物",
    "subcategory": "🍅 野菜",
    "icon": "🫛",
    "amounts": {
      "normalInternal": "200g",
      "smallInternal": "100g",
      "largeInternal": "250g",
      "normalLabel": "少し大人に分けたくらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.25
    },
    "normalNutrition": {
      "kcal": 90,
      "P": 8,
      "F": 4.5,
      "C": 7
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": "さやごと"
    }
  },
  {
    "id": "food-56",
    "name": "トマト",
    "category": "野菜・果物",
    "subcategory": "🍅 野菜",
    "icon": "🍅",
    "amounts": {
      "normalInternal": "1個",
      "smallInternal": "1/2個",
      "largeInternal": "1.5個",
      "normalLabel": "1個くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 40,
      "P": 1.5,
      "F": 0.3,
      "C": 9
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": ""
    }
  },
  {
    "id": "food-57",
    "name": "ブロッコリー",
    "category": "野菜・果物",
    "subcategory": "🍅 野菜",
    "icon": "🥦",
    "amounts": {
      "normalInternal": "70g",
      "smallInternal": "30g",
      "largeInternal": "100g",
      "normalLabel": "5個くらい"
    },
    "quantityMultipliers": {
      "small": 0.429,
      "large": 1.429
    },
    "normalNutrition": {
      "kcal": 26,
      "P": 3.8,
      "F": 0.4,
      "C": 4.6
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": ""
    }
  },
  {
    "id": "food-58",
    "name": "とうもろこし",
    "category": "野菜・果物",
    "subcategory": "🍅 野菜",
    "icon": "🌽",
    "amounts": {
      "normalInternal": "1本",
      "smallInternal": "1/2本",
      "largeInternal": "1.5本",
      "normalLabel": "1本くらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 150,
      "P": 5,
      "F": 2.5,
      "C": 31
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": ""
    }
  },
  {
    "id": "food-59",
    "name": "その他",
    "category": "野菜・果物",
    "subcategory": "🍅 野菜",
    "icon": "🥗",
    "amounts": {
      "normalInternal": "100g",
      "smallInternal": "50g",
      "largeInternal": "200g",
      "normalLabel": "100gくらい"
    },
    "quantityMultipliers": {
      "small": 0.5,
      "large": 1.5
    },
    "normalNutrition": {
      "kcal": 35,
      "P": 2,
      "F": 0.3,
      "C": 7
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "中",
      "note": ""
    }
  },
  {
    "id": "food-60",
    "name": "たまごスープ",
    "category": "その他",
    "subcategory": "🍲 スープ",
    "icon": "🐣",
    "amounts": {
      "normalInternal": "8割",
      "smallInternal": "6割",
      "largeInternal": "全部",
      "normalLabel": "少し大人に分けたくらい"
    },
    "quantityMultipliers": {
      "small": 0.75,
      "large": 1.25
    },
    "normalNutrition": {
      "kcal": 105,
      "P": 7,
      "F": 5,
      "C": 8
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "概算",
      "note": "卵1個、コンソメ小さじ3、玉ねぎ1/2個、水500ml、塩小さじ1/4。全量で計算。"
    }
  },
  {
    "id": "food-61",
    "name": "みそ汁",
    "category": "その他",
    "subcategory": "🍲 スープ",
    "icon": "🥬",
    "amounts": {
      "normalInternal": "7割",
      "smallInternal": "5割",
      "largeInternal": "全部",
      "normalLabel": "少し大人に分けたくらい"
    },
    "quantityMultipliers": {
      "small": 0.714,
      "large": 1.429
    },
    "normalNutrition": {
      "kcal": 80,
      "P": 5,
      "F": 2.5,
      "C": 10
    },
    "source": {
      "basis": "日本食品標準成分表2020年版（八訂）相当の一般値／家庭レシピからの概算",
      "url": "https://fooddb.mext.go.jp/",
      "confidence": "概算",
      "note": "キャベツ1/4個、味噌適量、水600ml、塩1/4。全量で計算。"
    }
  }
]
