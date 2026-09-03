import { useMemo, useRef, useState, type CSSProperties } from 'react'
import { addPfc, emptyPfc, localDateKey, nutrientMeta, quantityLabels, rulerScale, scalePfc, starsFor, type Nutrient, type Pfc, type Quantity } from './domain'
import { categoryTabs, foodMaster, type Food, type FoodCategory } from './data/foodMaster'
import { loadLogs, saveLogs, type FoodLog } from './storage'

type Screen = 'today' | 'add'

function Character({ nutrient }: { nutrient: Nutrient }) {
  return <span className={`character character-${nutrient}`} aria-hidden="true"><b>{nutrient}</b><i>• •</i></span>
}

function StarLine({ pfc }: { pfc: Pfc }) {
  return <div className="star-lines">{(['P', 'F', 'C'] as Nutrient[]).map((n) => {
    const count = starsFor(pfc[n], n)
    const stars = count === 0
      ? '☆0'
      : count <= 5
        ? `${'★'.repeat(count)}${'☆'.repeat(5 - count)}`
        : `${'★'.repeat(5)} +${count - 5}`
    return <span key={n} className={`stars stars-${n}`}><b>{n}</b>{` ${stars}`}</span>
  })}</div>
}

function Ruler({ nutrient, current, future, mini = false }: { nutrient: Nutrient; current: number; future?: number; mini?: boolean }) {
  const meta = nutrientMeta[nutrient]
  const currentMemories = current / meta.unit
  const futureMemories = future === undefined ? undefined : future / meta.unit
  const scale = rulerScale(Math.max(currentMemories, futureMemories ?? 0))
  const position = (value: number) => `${Math.min(100, Math.max(0, value / scale * 100))}%`
  return <div className={`ruler-row ${mini ? 'mini-ruler' : ''}`}>
    <div className="ruler-label"><Character nutrient={nutrient} /><span>{meta.label}</span></div>
    <div className="ruler" style={{ '--accent': meta.color, '--zone-start': position(meta.zone[0]), '--zone-end': position(meta.zone[1]) } as CSSProperties}>
      <span className="zone"><i className="zone-boundary zone-start" /><i className="zone-boundary zone-end" /></span>
      <span className="fill" style={{ width: position(currentMemories) }} />
      {futureMemories !== undefined && <span className="future-fill" style={{ left: position(currentMemories), width: `${Math.max(0, (futureMemories - currentMemories) / scale * 100)}%` }} />}
      {!mini && <span className="ticks">{Array.from({ length: scale + 1 }, (_, i) => <i key={i} />)}</span>}
    </div>
  </div>
}

function PfcRulers({ total, preview, mini = false }: { total: Pfc; preview?: Pfc; mini?: boolean }) {
  return <div className={`rulers ${mini ? 'rulers-mini' : ''}`}>{(['P', 'F', 'C'] as Nutrient[]).map((nutrient) => <Ruler key={nutrient} nutrient={nutrient} current={total[nutrient]} future={preview?.[nutrient]} mini={mini} />)}</div>
}

function AddScreen({ total, onBack, onAdd }: { total: Pfc; onBack: () => void; onAdd: (food: Food, quantity: Quantity) => void }) {
  const [category, setCategory] = useState<FoodCategory | null>(null)
  const [food, setFood] = useState<Food | null>(null)
  const [quantity, setQuantity] = useState<Quantity | null>(null)
  const addLock = useRef(false)
  const selectedPfc = food && quantity ? scalePfc(food.normalNutrition, quantity === 'normal' ? 1 : food.quantityMultipliers[quantity]) : undefined
  const preview = selectedPfc ? addPfc(total, selectedPfc) : undefined
  const foods = category ? foodMaster.filter((item) => item.category === category) : []
  const groups = foods.reduce<Record<string, Food[]>>((all, item) => ({ ...all, [item.subcategory]: [...(all[item.subcategory] ?? []), item] }), {})
  function changeCategory(next: FoodCategory) { setCategory(next); setFood(null); setQuantity(null) }
  function selectFood(next: Food) { setFood(next); setQuantity(null) }
  return <main className="add-screen">
    <header className="add-header"><button className="back" onClick={onBack} aria-label="きょうへ戻る">‹</button><span>食べものをえらぶ</span></header>
    <section className="fixed-mini"><PfcRulers total={total} preview={preview} mini /></section>
    <section className="picker">
      <nav className="category-tabs" aria-label="カテゴリ">{categoryTabs.map((tab) => <button key={tab.name} onClick={() => changeCategory(tab.name)} className={category === tab.name ? 'active' : ''}><span>{tab.icon}</span>{tab.name}</button>)}</nav>
      {!category ? <p className="choose-category">カテゴリをえらぼう</p> : <div className="food-groups">{Object.entries(groups).map(([name, items]) => <section key={name}><h2>{name}</h2><div className="food-grid">{items.map((item) => <button className={food?.id === item.id ? 'food active' : 'food'} key={item.id} onClick={() => selectFood(item)}><span>{item.icon}</span>{item.name}</button>)}</div></section>)}</div>}
    </section>
    <section className={`selection-panel ${food ? 'expanded' : ''}`}>
      {food ? <><div className="chosen-food"><span>{food.icon}</span><div><b>{food.name}</b><small>ふつう（{food.amounts.normalLabel}）</small></div></div><div className="quantity-buttons">{(['small', 'normal', 'large'] as Quantity[]).map((item) => <button key={item} className={quantity === item ? 'active' : ''} onClick={() => setQuantity(item)}>{quantityLabels[item]}</button>)}</div>{selectedPfc && <div className="preview-details"><StarLine pfc={selectedPfc} /><span>上の物差しに、増えるぶんが光っているよ</span></div>}</> : <p>食べものをえらぶと、ここで量をえらべるよ</p>}
      <button className="add-button" disabled={!food || !quantity} onClick={() => { if (food && quantity && !addLock.current) { addLock.current = true; onAdd(food, quantity) } }}>追加する</button>
    </section>
  </main>
}

function Today({ logs, total, onOpenAdd, onRemove }: { logs: FoodLog[]; total: Pfc; onOpenAdd: () => void; onRemove: (id: string) => void }) {
  const [menuId, setMenuId] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const today = new Intl.DateTimeFormat('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' }).format(new Date())
  return <main className="today"><header className="today-header"><time>{today}</time><h1>きょうの PFC</h1></header><PfcRulers total={total} />
    <section className="log-list" aria-label="きょう食べたもの"><h2>きょう 食べたもの</h2>{logs.length === 0 ? <p className="quiet-empty">まだ なにも ならんでいないよ</p> : logs.map((log) => <article className="log-card" key={log.id}><button className="log-main" onClick={() => setMenuId(menuId === log.id ? null : log.id)}><span className="food-icon">{log.icon}</span><span className="log-info"><b>{log.foodName}</b><small>{quantityLabels[log.quantity]}{log.quantity === 'normal' ? `（${log.normalAmountLabel}）` : ''}</small><StarLine pfc={log.pfc} /></span><span className="dots">•••</span></button>{menuId === log.id && <div className="log-menu"><button onClick={() => { setConfirmId(log.id); setMenuId(null) }}>この記録を取り消す</button></div>}{confirmId === log.id && <div className="confirm"><p>この記録を取り消す？</p><button onClick={() => setConfirmId(null)}>やめる</button><button className="remove" onClick={() => { onRemove(log.id); setConfirmId(null) }}>取り消す</button></div>}</article>)}</section>
    <button className="choose-food" onClick={onOpenAdd}>＋ 食べものを選ぶ</button>
  </main>
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('today')
  const [logs, setLogs] = useState<FoodLog[]>(loadLogs)
  const todayKey = localDateKey()
  const todayLogs = useMemo(() => logs.filter((log) => log.dateKey === todayKey).sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [logs, todayKey])
  const total = useMemo(() => todayLogs.reduce((sum, log) => addPfc(sum, log.pfc), emptyPfc()), [todayLogs])
  function addLog(food: Food, quantity: Quantity) {
    const pfc = scalePfc(food.normalNutrition, quantity === 'normal' ? 1 : food.quantityMultipliers[quantity])
    const now = new Date()
    const log: FoodLog = { id: crypto.randomUUID(), foodId: food.id, foodName: food.name, icon: food.icon, quantity, normalAmountLabel: food.amounts.normalLabel, pfc, createdAt: now.toISOString(), dateKey: localDateKey(now) }
    setLogs((previous) => { const next = [...previous, log]; saveLogs(next); return next })
    setScreen('today')
  }
  function removeLog(id: string) { setLogs((previous) => { const next = previous.filter((log) => log.id !== id); saveLogs(next); return next }) }
  return screen === 'today' ? <Today logs={todayLogs} total={total} onOpenAdd={() => setScreen('add')} onRemove={removeLog} /> : <AddScreen total={total} onBack={() => setScreen('today')} onAdd={addLog} />
}
