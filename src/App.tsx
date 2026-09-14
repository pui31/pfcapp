import { useMemo, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { addPfc, emptyPfc, localDateFromKey, localDateKey, nutrientMeta, quantityLabels, rulerScale, scalePfc, shiftLocalDateKey, starsFor, type Nutrient, type Pfc, type Quantity } from './domain'
import { categoryTabs, foodMaster, type FoodCategory } from './data/foodMaster'
import { loadLogs, loadUserFoods, saveLogs, saveUserFoods, type FoodLog, type SelectableFood, type UserFood } from './storage'

type Screen = 'today' | 'add' | 'food-form'

function Character({ nutrient }: { nutrient: Nutrient }) {
  return <span className={`character character-${nutrient}`} aria-hidden="true"><b>{nutrient}</b><i>• •</i></span>
}

function StarLine({ pfc }: { pfc: Pfc }) {
  return <div className="star-lines">{(['P', 'F', 'C'] as Nutrient[]).map((nutrient) => {
    const count = starsFor(pfc[nutrient], nutrient)
    const stars = count === 0 ? '☆0' : count <= 5 ? `${'★'.repeat(count)}${'☆'.repeat(5 - count)}` : `${'★'.repeat(5)} +${count - 5}`
    return <span key={nutrient} className={`stars stars-${nutrient}`}><b>{nutrient}</b>{` ${stars}`}</span>
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
      {!mini && <span className="ticks">{Array.from({ length: scale + 1 }, (_, index) => <i key={index} />)}</span>}
    </div>
  </div>
}

function PfcRulers({ total, preview, mini = false }: { total: Pfc; preview?: Pfc; mini?: boolean }) {
  return <div className={`rulers ${mini ? 'rulers-mini' : ''}`}>{(['P', 'F', 'C'] as Nutrient[]).map((nutrient) => <Ruler key={nutrient} nutrient={nutrient} current={total[nutrient]} future={preview?.[nutrient]} mini={mini} />)}</div>
}

function FoodButton({ item, selected, onSelect, onLongPress }: { item: SelectableFood; selected: boolean; onSelect: () => void; onLongPress?: () => void }) {
  const timer = useRef<number | null>(null)
  const longPressed = useRef(false)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  function clearTimer() {
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = null
  }
  function startLongPress(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!onLongPress || (event.pointerType === 'mouse' && event.button !== 0)) return
    longPressed.current = false
    pointerStart.current = { x: event.clientX, y: event.clientY }
    clearTimer()
    timer.current = window.setTimeout(() => {
      longPressed.current = true
      onLongPress()
      navigator.vibrate?.(25)
    }, 550)
  }
  function handlePointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!pointerStart.current) return
    if (Math.hypot(event.clientX - pointerStart.current.x, event.clientY - pointerStart.current.y) > 8) clearTimer()
  }
  return <button
    className={`${selected ? 'food active' : 'food'}${item.isUser ? ' user-food' : ''}`}
    onClick={() => { if (longPressed.current) { longPressed.current = false; return } onSelect() }}
    onPointerDown={startLongPress}
    onPointerUp={clearTimer}
    onPointerCancel={clearTimer}
    onPointerLeave={clearTimer}
    onPointerMove={handlePointerMove}
    onContextMenu={(event) => { if (onLongPress) { event.preventDefault(); onLongPress() } }}
  >
    <span>{item.icon}</span>{item.name}
    {item.isUser && <small>マイ食品</small>}
  </button>
}

function AddScreen({ total, foods, initialFoodId, onBack, onAdd, onCreateFood, onEditFood, onDeleteFood }: {
  total: Pfc
  foods: SelectableFood[]
  initialFoodId: string | null
  onBack: () => void
  onAdd: (food: SelectableFood, quantity: Quantity) => void
  onCreateFood: () => void
  onEditFood: (food: UserFood) => void
  onDeleteFood: (id: string) => void
}) {
  const initialFood = initialFoodId ? foods.find((item) => item.id === initialFoodId) ?? null : null
  const [category, setCategory] = useState<FoodCategory | null>(initialFood?.category ?? null)
  const [food, setFood] = useState<SelectableFood | null>(initialFood)
  const [quantity, setQuantity] = useState<Quantity | null>(null)
  const [actionFood, setActionFood] = useState<UserFood | null>(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const addLock = useRef(false)
  const selectedPfc = food && quantity ? scalePfc(food.normalNutrition, quantity === 'normal' ? 1 : food.quantityMultipliers[quantity]) : undefined
  const preview = selectedPfc ? addPfc(total, selectedPfc) : undefined
  const categoryFoods = category ? foods.filter((item) => item.category === category) : []
  const groups = categoryFoods.reduce<Record<string, SelectableFood[]>>((all, item) => ({ ...all, [item.subcategory]: [...(all[item.subcategory] ?? []), item] }), {})
  function changeCategory(next: FoodCategory) { setCategory(next); setFood(null); setQuantity(null) }
  function selectFood(next: SelectableFood) { setFood(next); setQuantity(null) }
  function closeActions() { setActionFood(null); setConfirmDelete(false) }
  return <main className="add-screen">
    <header className="add-header"><button className="back" onClick={onBack} aria-label="表示していた日へ戻る">‹</button><span>食べものをえらぶ</span></header>
    <section className="fixed-mini"><PfcRulers total={total} preview={preview} mini /></section>
    <section className="picker">
      <nav className="category-tabs" aria-label="カテゴリ">
        {categoryTabs.map((tab) => <button key={tab.name} onClick={() => changeCategory(tab.name)} className={category === tab.name ? 'active' : ''}><span>{tab.icon}</span>{tab.name}</button>)}
        <button className="create-food-tab" onClick={onCreateFood}><span>＋</span>食品追加</button>
      </nav>
      {!category ? <p className="choose-category">カテゴリをえらぼう</p> : <div className="food-groups">{Object.entries(groups).map(([name, items]) => <section key={name}><h2>{name}</h2><div className="food-grid">{items.map((item) => <FoodButton key={item.id} item={item} selected={food?.id === item.id} onSelect={() => selectFood(item)} onLongPress={item.isUser ? () => { setActionFood(item as UserFood); setConfirmDelete(false) } : undefined} />)}</div></section>)}</div>}
    </section>
    <section className={`selection-panel ${food ? 'expanded' : ''}`}>
      {food ? <><div className="chosen-food"><span>{food.icon}</span><div><b>{food.name}</b><small>ふつう（{food.amounts.normalLabel}）</small></div></div><div className="quantity-buttons">{(['small', 'normal', 'large'] as Quantity[]).map((item) => <button key={item} className={quantity === item ? 'active' : ''} onClick={() => setQuantity(item)}>{quantityLabels[item]}</button>)}</div>{selectedPfc && <div className="preview-details"><StarLine pfc={selectedPfc} /><span>上の物差しに、増えるぶんが光っているよ</span></div>}</> : <p>食べものをえらぶと、ここで量をえらべるよ</p>}
      <button className="add-button" disabled={!food || !quantity} onClick={() => { if (food && quantity && !addLock.current) { addLock.current = true; onAdd(food, quantity) } }}>追加する</button>
    </section>
    {actionFood && <div className="sheet-backdrop" onClick={closeActions}>
      <section className="food-action-sheet" role="dialog" aria-modal="true" aria-label={`${actionFood.name}の操作`} onClick={(event) => event.stopPropagation()}>
        <div className="action-food-name"><span>{actionFood.icon}</span><b>{actionFood.name}</b></div>
        {confirmDelete ? <><p>この食品を削除する？</p><small>これまでの食事記録は消えません</small><div className="action-row"><button onClick={() => setConfirmDelete(false)}>やめる</button><button className="remove" onClick={() => { onDeleteFood(actionFood.id); if (food?.id === actionFood.id) setFood(null); closeActions() }}>削除する</button></div></> : <><button onClick={() => onEditFood(actionFood)}>編集</button><button onClick={() => setConfirmDelete(true)}>削除</button><button className="cancel-action" onClick={closeActions}>閉じる</button></>}
      </section>
    </div>}
  </main>
}

type FoodDraft = {
  name: string
  category: FoodCategory | ''
  subcategory: string
  icon: string
  normalLabel: string
  P: string
  F: string
  C: string
  smallPercent: string
  largePercent: string
}

function draftFor(food: UserFood | null): FoodDraft {
  if (!food) return { name: '', category: '', subcategory: '', icon: '', normalLabel: '', P: '', F: '', C: '', smallPercent: '70', largePercent: '150' }
  return { name: food.name, category: food.category, subcategory: food.subcategory, icon: food.icon, normalLabel: food.amounts.normalLabel, P: String(food.normalNutrition.P), F: String(food.normalNutrition.F), C: String(food.normalNutrition.C), smallPercent: String(food.quantityMultipliers.small * 100), largePercent: String(food.quantityMultipliers.large * 100) }
}

function FoodFormScreen({ food, onBack, onSave }: { food: UserFood | null; onBack: () => void; onSave: (draft: FoodDraft) => void }) {
  const [draft, setDraft] = useState(() => draftFor(food))
  const [error, setError] = useState('')
  const subcategories = useMemo(() => draft.category ? [...new Set(foodMaster.filter((item) => item.category === draft.category).map((item) => item.subcategory))] : [], [draft.category])
  const pfcPreview = { P: Number(draft.P), F: Number(draft.F), C: Number(draft.C) }
  const canPreview = (['P', 'F', 'C'] as Nutrient[]).every((nutrient) => draft[nutrient] !== '' && Number.isFinite(pfcPreview[nutrient]) && pfcPreview[nutrient] >= 0)
  function update<Key extends keyof FoodDraft>(key: Key, value: FoodDraft[Key]) { setDraft((current) => ({ ...current, [key]: value })) }
  function submit(event: FormEvent) {
    event.preventDefault()
    const small = Number(draft.smallPercent)
    const large = Number(draft.largePercent)
    if (!draft.name.trim() || !draft.category || !draft.subcategory || !draft.icon.trim() || !draft.normalLabel.trim() || !canPreview) {
      setError('入力していないところがあるよ')
      return
    }
    if (!Number.isFinite(small) || small <= 0 || small > 100 || !Number.isFinite(large) || large < 100 || large > 500) {
      setError('ちょっとは1〜100%、いっぱいは100〜500%で入力してね')
      return
    }
    onSave(draft)
  }
  return <main className="food-form-screen">
    <header className="food-form-header"><button className="form-back" type="button" onClick={onBack}>← もどる</button><h1>{food ? '食品を編集' : '食品を追加'}</h1></header>
    <form className="food-form" onSubmit={submit}>
      <label><span>食品名</span><input value={draft.name} onChange={(event) => update('name', event.target.value)} placeholder="例：カレー" required /></label>
      <div className="form-two-columns">
        <label><span>カテゴリ</span><select value={draft.category} onChange={(event) => { update('category', event.target.value as FoodCategory); update('subcategory', '') }} required><option value="">えらぶ</option>{categoryTabs.map((tab) => <option key={tab.name} value={tab.name}>{tab.icon} {tab.name}</option>)}</select></label>
        <label><span>サブカテゴリ</span><select value={draft.subcategory} onChange={(event) => update('subcategory', event.target.value)} disabled={!draft.category} required><option value="">えらぶ</option>{subcategories.map((subcategory) => <option key={subcategory} value={subcategory}>{subcategory}</option>)}</select></label>
      </div>
      <label><span>アイコン</span><input className="icon-input" value={draft.icon} onChange={(event) => update('icon', event.target.value)} placeholder="例：🍛" maxLength={8} required /><small>絵文字を入力してね</small></label>
      <label><span>ふつう量の表示</span><input value={draft.normalLabel} onChange={(event) => update('normalLabel', event.target.value)} placeholder="例：1杯くらい" required /></label>
      <fieldset><legend>ふつう量の P / F / C</legend><div className="pfc-inputs">{(['P', 'F', 'C'] as Nutrient[]).map((nutrient) => <label key={nutrient} className={`nutrient-input nutrient-input-${nutrient}`}><span>{nutrient} (g)</span><input type="number" inputMode="decimal" min="0" step="0.1" value={draft[nutrient]} onChange={(event) => update(nutrient, event.target.value)} required /></label>)}</div>{canPreview && <div className="form-star-preview"><small>星は自動でこうなるよ</small><StarLine pfc={pfcPreview} /></div>}</fieldset>
      <fieldset><legend>量の割合（ふつう = 100%）</legend><div className="form-two-columns"><label><span>ちょっと (%)</span><input type="number" inputMode="decimal" min="1" max="100" step="1" value={draft.smallPercent} onChange={(event) => update('smallPercent', event.target.value)} required /></label><label><span>いっぱい (%)</span><input type="number" inputMode="decimal" min="100" max="500" step="1" value={draft.largePercent} onChange={(event) => update('largePercent', event.target.value)} required /></label></div></fieldset>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="save-food" type="submit">保存する</button>
    </form>
  </main>
}

function Today({ dateKey, todayKey, logs, total, onDateChange, onOpenAdd, onRemove }: { dateKey: string; todayKey: string; logs: FoodLog[]; total: Pfc; onDateChange: (dateKey: string) => void; onOpenAdd: () => void; onRemove: (id: string) => void }) {
  const [menuId, setMenuId] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const dateInput = useRef<HTMLInputElement>(null)
  const isToday = dateKey === todayKey
  const dateLabel = new Intl.DateTimeFormat('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' }).format(localDateFromKey(dateKey))
  function openCalendar() { dateInput.current?.showPicker?.() }
  function selectDate(value: string) { if (value && value <= todayKey) onDateChange(value) }
  return <main className="today">
    <header className="today-header">
      <div className="date-navigation"><button className="day-arrow" onClick={() => onDateChange(shiftLocalDateKey(dateKey, -1))} aria-label="前の日へ">‹</button><div className="date-picker-wrap"><button className="date-button" onClick={openCalendar} aria-label={`${dateLabel}。日付を選ぶ`}><time dateTime={dateKey}>{dateLabel}</time><span aria-hidden="true">▼</span></button><input ref={dateInput} className="native-date-input" type="date" value={dateKey} max={todayKey} onInput={(event) => selectDate(event.currentTarget.value)} onChange={(event) => selectDate(event.currentTarget.value)} aria-label="表示する日付" /></div><button className="day-arrow" disabled={isToday} onClick={() => onDateChange(shiftLocalDateKey(dateKey, 1))} aria-label="次の日へ">›</button></div>
      <div className="date-context"><h1>{isToday ? 'きょうの PFC' : 'この日の PFC'}</h1>{!isToday && <><span className="past-label">過去の記録</span><button className="back-today" onClick={() => onDateChange(todayKey)}>今日に戻る</button></>}</div>
    </header>
    <PfcRulers total={total} />
    <section className="log-list" aria-label={`${dateLabel}に食べたもの`}><h2>{isToday ? 'きょう 食べたもの' : 'この日 食べたもの'}</h2>{logs.length === 0 ? <p className="quiet-empty">この日は まだ なにも ならんでいないよ</p> : logs.map((log) => <article className="log-card" key={log.id}><button className="log-main" onClick={() => setMenuId(menuId === log.id ? null : log.id)}><span className="food-icon">{log.icon}</span><span className="log-info"><b>{log.foodName}</b><small>{quantityLabels[log.quantity]}{log.quantity === 'normal' ? `（${log.normalAmountLabel}）` : ''}</small><StarLine pfc={log.pfc} /></span><span className="dots">•••</span></button>{menuId === log.id && <div className="log-menu"><button onClick={() => { setConfirmId(log.id); setMenuId(null) }}>この記録を取り消す</button></div>}{confirmId === log.id && <div className="confirm"><p>この記録を取り消す？</p><button onClick={() => setConfirmId(null)}>やめる</button><button className="remove" onClick={() => { onRemove(log.id); setConfirmId(null) }}>取り消す</button></div>}</article>)}</section>
    <button className="choose-food" onClick={onOpenAdd}>＋ 食べものを選ぶ</button>
  </main>
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('today')
  const [logs, setLogs] = useState<FoodLog[]>(loadLogs)
  const [userFoods, setUserFoods] = useState<UserFood[]>(loadUserFoods)
  const [viewedDateKey, setViewedDateKey] = useState(localDateKey)
  const [addSelectedFoodId, setAddSelectedFoodId] = useState<string | null>(null)
  const [editingFood, setEditingFood] = useState<UserFood | null>(null)
  const todayKey = localDateKey()
  const allFoods = useMemo<SelectableFood[]>(() => [...foodMaster, ...userFoods], [userFoods])
  const viewedLogs = useMemo(() => logs.filter((log) => log.dateKey === viewedDateKey).sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [logs, viewedDateKey])
  const total = useMemo(() => viewedLogs.reduce((sum, log) => addPfc(sum, log.pfc), emptyPfc()), [viewedLogs])
  function changeViewedDate(nextDateKey: string) { setViewedDateKey(nextDateKey > todayKey ? todayKey : nextDateKey); setAddSelectedFoodId(null) }
  function addLog(food: SelectableFood, quantity: Quantity) {
    const pfc = scalePfc(food.normalNutrition, quantity === 'normal' ? 1 : food.quantityMultipliers[quantity])
    const now = new Date()
    const log: FoodLog = { id: crypto.randomUUID(), foodId: food.id, foodName: food.name, icon: food.icon, quantity, normalAmountLabel: food.amounts.normalLabel, pfc, createdAt: now.toISOString(), dateKey: viewedDateKey }
    setLogs((previous) => { const next = [...previous, log]; saveLogs(next); return next })
    setAddSelectedFoodId(null)
    setScreen('today')
  }
  function removeLog(id: string) { setLogs((previous) => { const next = previous.filter((log) => log.id !== id); saveLogs(next); return next }) }
  function deleteUserFood(id: string) { setUserFoods((previous) => { const next = previous.filter((food) => food.id !== id); saveUserFoods(next); return next }); if (addSelectedFoodId === id) setAddSelectedFoodId(null) }
  function saveFood(draft: FoodDraft) {
    const now = new Date().toISOString()
    const saved: UserFood = { id: editingFood?.id ?? `user-food-${crypto.randomUUID()}`, isUser: true, name: draft.name.trim(), category: draft.category as FoodCategory, subcategory: draft.subcategory, icon: draft.icon.trim(), amounts: { normalLabel: draft.normalLabel.trim() }, normalNutrition: { P: Number(draft.P), F: Number(draft.F), C: Number(draft.C) }, quantityMultipliers: { small: Number(draft.smallPercent) / 100, large: Number(draft.largePercent) / 100 }, createdAt: editingFood?.createdAt ?? now, updatedAt: now }
    setUserFoods((previous) => { const next = editingFood ? previous.map((food) => food.id === saved.id ? saved : food) : [...previous, saved]; saveUserFoods(next); return next })
    setEditingFood(null)
    setAddSelectedFoodId(saved.id)
    setScreen('add')
  }
  if (screen === 'today') return <Today dateKey={viewedDateKey} todayKey={todayKey} logs={viewedLogs} total={total} onDateChange={changeViewedDate} onOpenAdd={() => { setAddSelectedFoodId(null); setScreen('add') }} onRemove={removeLog} />
  if (screen === 'food-form') return <FoodFormScreen food={editingFood} onBack={() => { setAddSelectedFoodId(editingFood?.id ?? null); setEditingFood(null); setScreen('add') }} onSave={saveFood} />
  return <AddScreen total={total} foods={allFoods} initialFoodId={addSelectedFoodId} onBack={() => setScreen('today')} onAdd={addLog} onCreateFood={() => { setEditingFood(null); setScreen('food-form') }} onEditFood={(food) => { setEditingFood(food); setScreen('food-form') }} onDeleteFood={deleteUserFood} />
}
