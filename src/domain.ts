export type Nutrient = 'P' | 'F' | 'C'
export type Pfc = Record<Nutrient, number>
export type Quantity = 'small' | 'normal' | 'large'

export const nutrientMeta: Record<Nutrient, { label: string; color: string; unit: number; zone: [number, number] }> = {
  P: { label: 'たんぱく質', color: '#d96370', unit: 5, zone: [8, 14] },
  F: { label: '脂質', color: '#dcad3f', unit: 5, zone: [8, 11] },
  C: { label: '炭水化物', color: '#54a9c7', unit: 15, zone: [14, 18] },
}

export const emptyPfc = (): Pfc => ({ P: 0, F: 0, C: 0 })
export const addPfc = (left: Pfc, right: Pfc): Pfc => ({ P: left.P + right.P, F: left.F + right.F, C: left.C + right.C })
export const scalePfc = (pfc: Pfc, multiplier: number): Pfc => ({ P: pfc.P * multiplier, F: pfc.F * multiplier, C: pfc.C * multiplier })
export const quantityLabels: Record<Quantity, string> = { small: 'ちょっと', normal: 'ふつう', large: 'いっぱい' }

export function starsFor(value: number, nutrient: Nutrient): number {
  const zeroLimit = nutrient === 'P' ? 2 : nutrient === 'F' ? 1 : 5
  if (value <= zeroLimit) return 0
  return Math.max(1, Math.round(value / nutrientMeta[nutrient].unit))
}

export function rulerScale(memories: number) {
  return Math.max(20, Math.ceil(memories / 5) * 5)
}

export function localDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
