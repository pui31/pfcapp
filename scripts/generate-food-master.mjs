import { readFile, writeFile } from 'node:fs/promises'

const sourcePath = new URL('../data/food-master/PFCApp_foodmaster.csv', import.meta.url)
const outputPath = new URL('../src/data/foodMaster.ts', import.meta.url)

function parseCsv(text) {
  const rows = []
  let row = []
  let value = ''
  let quoted = false

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index]
    if (character === '"') {
      if (quoted && text[index + 1] === '"') { value += '"'; index += 1 } else quoted = !quoted
    } else if (character === ',' && !quoted) {
      row.push(value); value = ''
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && text[index + 1] === '\n') index += 1
      row.push(value)
      if (row.some((cell) => cell !== '')) rows.push(row)
      row = []; value = ''
    } else value += character
  }
  if (value || row.length) { row.push(value); rows.push(row) }
  return rows
}

const [header, ...rows] = parseCsv(await readFile(sourcePath, 'utf8'))
const records = rows.map((row) => Object.fromEntries(header.map((column, index) => [column, row[index] ?? ''])))
if (records.length !== 67) throw new Error(`Expected 67 food records, found ${records.length}`)

const foods = records.map((food) => ({
  id: `food-${food.No}`,
  name: food['食品名'],
  category: food['アプリカテゴリ'],
  subcategory: food['小分類'],
  icon: food['アイコン'],
  amounts: {
    normalInternal: food['ふつう内部量'],
    smallInternal: food['ちょっと内部量'],
    largeInternal: food['いっぱい内部量'],
    normalLabel: food['ふつう表示量（子ども向け）'],
  },
  quantityMultipliers: { small: Number(food['ちょっと倍率']), large: Number(food['いっぱい倍率']) },
  normalNutrition: {
    kcal: Number(food['ふつうkcal']), P: Number(food['ふつうP(g)']), F: Number(food['ふつうF(g)']), C: Number(food['ふつうC(g)']),
  },
  source: {
    basis: food['栄養値の根拠'], url: food['参照URL'], confidence: food['確度'], note: food['メモ'],
  },
}))

const output = `// Generated from data/food-master/PFCApp_foodmaster.csv. Do not edit by hand.\n// Run: node scripts/generate-food-master.mjs\n\nimport type { Pfc, Quantity } from '../domain'\n\nexport type FoodCategory = '主食' | 'おかず' | '野菜・果物' | 'おやつ' | 'その他'\n\nexport type Food = {\n  id: string\n  name: string\n  category: FoodCategory\n  subcategory: string\n  icon: string\n  amounts: {\n    normalInternal: string\n    smallInternal: string\n    largeInternal: string\n    normalLabel: string\n  }\n  quantityMultipliers: Pick<Record<Quantity, number>, 'small' | 'large'>\n  normalNutrition: Pfc & { kcal: number }\n  source: { basis: string; url: string; confidence: string; note: string }\n}\n\nexport const categoryTabs: { name: FoodCategory; icon: string }[] = [\n  { name: '主食', icon: '🍚' }, { name: 'おかず', icon: '🥩' }, { name: '野菜・果物', icon: '🍅' }, { name: 'おやつ', icon: '🍪' }, { name: 'その他', icon: '🍲' },\n]\n\nexport const foodMaster: Food[] = ${JSON.stringify(foods, null, 2)}\n`

await writeFile(outputPath, output)
