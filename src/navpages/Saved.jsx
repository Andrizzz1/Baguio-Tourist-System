import { DashboardNav } from "../dashboard/DashboardNav"
import { BookmarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from "react"

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

  * { box-sizing: border-box; }

  .saved-root {
    font-family: 'Roboto', sans-serif;
    background: #f7f8f5;
    min-height: 100vh;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position: 600px 0; }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Hero ── */
  .hero-wrap {
    animation: fadeIn 0.6s ease forwards;
  }
  .hero-inner {
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    background: #0d2e1a;
    padding: 56px 48px;
    color: white;
  }
  .hero-inner::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 70% 80% at 85% 50%, rgba(16,185,129,0.18) 0%, transparent 65%),
      radial-gradient(ellipse 40% 40% at 10% 80%, rgba(16,185,129,0.1) 0%, transparent 60%);
    pointer-events: none;
  }
  .hero-inner::after {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 320px; height: 320px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.04);
    pointer-events: none;
  }
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6ee7b7;
    margin-bottom: 16px;
    animation: fadeUp 0.5s ease 0.2s both;
  }
  .hero-title {
    font-family: 'Roboto', Georgia, serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 400;
    line-height: 1.15;
    color: #f0fdf4;
    margin: 0 0 12px;
    animation: fadeUp 0.55s ease 0.3s both;
  }
  .hero-title em {
    font-style: normal;
    color: #6ee7b7;
  }
  .hero-sub {
    font-size: 0.95rem;
    color: rgba(255,255,255,0.5);
    max-width: 440px;
    line-height: 1.65;
    animation: fadeUp 0.55s ease 0.4s both;
  }
  .hero-stat {
    position: absolute;
    bottom: 32px; right: 40px;
    text-align: right;
    animation: fadeIn 0.5s ease 0.55s both;
  }
  .hero-stat-num {
    font-family: 'Roboto', serif;
    font-size: 2.8rem;
    color: #6ee7b7;
    line-height: 1;
  }
  .hero-stat-label {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-top: 2px;
  }

  /* ── Tab Bar ── */
  .tabbar-wrap {
    animation: slideDown 0.45s ease 0.25s both;
  }
  .tabbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-radius: 18px;
    padding: 6px 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04);
  }
  .tabs-left {
    display: flex;
    gap: 2px;
  }
  .tab-pill {
    position: relative;
    cursor: pointer;
    padding: 7px 18px;
    border-radius: 12px;
    font-size: 0.82rem;
    font-weight: 500;
    transition: color 0.2s, background 0.2s;
    color: #9ca3af;
    border: none;
    background: transparent;
  }
  .tab-pill:hover { color: #374151; background: #f9fafb; }
  .tab-pill.active {
    background: #f0fdf4;
    color: #065f46;
    font-weight: 600;
    box-shadow: 0 0 0 1px #a7f3d0;
  }
  .search-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f9fafb;
    border-radius: 10px;
    padding: 6px 12px;
    border: 1px solid #f3f4f6;
    transition: border-color 0.2s;
  }
  .search-wrap:focus-within { border-color: #6ee7b7; }
  .search-input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 0.82rem;
    color: #374151;
    width: 130px;
    font-family: 'Roboto', sans-serif;
    transition: width 0.3s ease;
  }
  .search-input:focus { width: 180px; }
  .search-input::placeholder { color: #c4c9d4; }

  /* ── Cards ── */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }

  .saved-card {
    opacity: 0;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    transition: transform 0.3s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.3s ease;
    cursor: pointer;
  }
  .saved-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 32px rgba(0,0,0,0.1);
  }
  .saved-card-img-wrap {
    position: relative;
    overflow: hidden;
    height: 168px;
  }
  .saved-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    display: block;
  }
  .saved-card:hover img { transform: scale(1.06); }
  .saved-card-img-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 55%);
    pointer-events: none;
  }
  .card-body { padding: 14px 16px 16px; }
  .card-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 6px;
    margin-bottom: 8px;
  }
  .badge-saved    { background: #f0fdf4; color: #059669; }
  .badge-itinerary{ background: #eff6ff; color: #2563eb; }

  .card-name {
    font-weight: 600;
    font-size: 0.92rem;
    color: #111827;
    line-height: 1.3;
    margin: 0 0 4px;
  }
  .card-loc {
    font-size: 0.78rem;
    color: #9ca3af;
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 0;
  }
  .card-loc svg {
    width: 11px; height: 11px;
    flex-shrink: 0;
  }

  /* ── Skeleton ── */
  .skeleton {
    background: linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%);
    background-size: 600px 100%;
    animation: shimmer 1.6s infinite;
    border-radius: 12px;
  }

  /* ── Empty ── */
  .empty-state {
    animation: fadeIn 0.5s ease forwards;
    grid-column: 1 / -1;
  }
  .empty-icon-wrap {
    width: 56px; height: 56px;
    border-radius: 16px;
    background: #f0fdf4;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 12px;
  }

  /* ── Panel transition ── */
  .panel { transition: opacity 0.3s ease, transform 0.3s ease; }
  .panel.hidden-panel {
    opacity: 0; transform: translateY(6px);
    pointer-events: none; position: absolute; inset: 0;
  }
  .panel.visible-panel {
    opacity: 1; transform: translateY(0); position: relative;
  }
`

const SkeletonCard = () => (
    <div className="saved-card" style={{ opacity: 1 }}>
        <div className="skeleton" style={{ height: 168, borderRadius: '20px 20px 0 0' }} />
        <div style={{ padding: '14px 16px 16px' }}>
            <div className="skeleton" style={{ height: 10, width: '40%', marginBottom: 10 }} />
            <div className="skeleton" style={{ height: 14, width: '75%', marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 11, width: '55%' }} />
        </div>
    </div>
)

const SpotCard = ({ data, index, variant = "default" }) => {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const timer = setTimeout(() => {
            el.style.animation = `fadeUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards`
        }, index * 70)
        return () => clearTimeout(timer)
    }, [index])

    return (
        <div ref={ref} className="saved-card">
            <div className="saved-card-img-wrap">
                <img
                    src={data.spot_image}
                    alt={data.spot_name}
                    onError={e => {
                        e.target.src = `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80`
                    }}
                />
            </div>
            <div className="card-body">
                {variant === "itinerary" && (
                    <span className="card-badge badge-itinerary"> Itinerary</span>
                )}
                {variant === "saved" && (
                    <span className="card-badge badge-saved"> Saved</span>
                )}
                <h3 className="card-name">{data.spot_name}</h3>
                <p className="card-loc">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                        <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    {data.spot_location}
                </p>
            </div>
        </div>
    )
}

const EmptyState = ({ message }) => (
    <div className="empty-state flex flex-col items-center justify-center py-20" style={{ opacity: 0 }}>
        <div className="empty-icon-wrap">
            <BookmarkIcon style={{ width: 24, color: '#34d399' }} />
        </div>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>{message}</p>
    </div>
)

export const Saved = () => {
    const [selected, setSelected] = useState('all')
    const [itineraries, setIteneraries] = useState([])
    const [allData, setAllData] = useState([])
    const [savedSpots, setSavedSpots] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    const fetchSaved = async () => {
        const user = JSON.parse(localStorage.getItem("user"))
        const userId = user?.id || user?.users_id
        if (!userId) return
        try {
            const res = await fetch(`/api/saved-spots?userId=${userId}`)
            const data = await res.json()
            setSavedSpots(res.ok && Array.isArray(data) ? data : [])
        } catch {
            setSavedSpots([])
        }
    }

    const fetchItinerary = async () => {
        const user = JSON.parse(localStorage.getItem("user"))
        const userId = user?.id || user?.users_id
        if (!userId) return
        try {
            const res = await fetch(`/api/itinerary?userId=${userId}`)
            const data = await res.json()
            setIteneraries(res.ok && Array.isArray(data) ? data : [])
        } catch {
            setIteneraries([])
        }
    }

    useEffect(() => {
        const loadAll = async () => {
            setLoading(true)
            await Promise.all([fetchItinerary(), fetchSaved()])
            setLoading(false)
        }
        loadAll()
    }, [])

    useEffect(() => {
        setAllData([...savedSpots, ...itineraries])
    }, [savedSpots, itineraries])

    const filter = (list) =>
        search.trim()
            ? list.filter(
                (d) =>
                    d.spot_name?.toLowerCase().includes(search.toLowerCase()) ||
                    d.spot_location?.toLowerCase().includes(search.toLowerCase())
            )
            : list

    const tabs = [
        { key: "all", label: "All" },
        { key: "saved", label: "Saved Spots" },
        { key: "itenerary", label: "Itineraries" },
    ]

    const totalCount = allData.length

    return (
        <section className="saved-root">
            <style>{globalStyles}</style>
            <DashboardNav />

            {/* Hero banner */}
            <div className="hero-wrap" style={{ padding: '24px 24px 0', maxWidth: 1200, margin: '0 auto' }}>
                <div className="hero-inner">
                    <div className="hero-eyebrow">
                        <BookmarkIcon style={{ width: 13 }} />
                        Your Collection
                    </div>
                    <h1 className="hero-title">
                        Saved Places &<br /><em>Itineraries</em>
                    </h1>
                    <p className="hero-sub">
                        Everything you've bookmarked across Baguio spots to revisit, food to try, and trips to plan.
                    </p>
                    {!loading && (
                        <div className="hero-stat">
                            <div className="hero-stat-num">{totalCount}</div>
                            <div className="hero-stat-label">Places saved</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tab bar */}
            <div className="tabbar-wrap" style={{ padding: '16px 24px', maxWidth: 1200, margin: '0 auto' }}>
                <div className="tabbar">
                    <div className="tabs-left">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setSelected(tab.key)}
                                className={`tab-pill ${selected === tab.key ? "active" : ""}`}
                            >
                                {tab.label}
                                {tab.key === "saved" && !loading && (
                                    <span style={{ marginLeft: 6, fontSize: 10, background: '#f0fdf4', color: '#059669', padding: '1px 6px', borderRadius: 6 }}>
                                        {savedSpots.length}
                                    </span>
                                )}
                                {tab.key === "itenerary" && !loading && (
                                    <span style={{ marginLeft: 6, fontSize: 10, background: '#eff6ff', color: '#2563eb', padding: '1px 6px', borderRadius: 6 }}>
                                        {itineraries.length}
                                    </span>
                                )}
                                {tab.key === "all" && !loading && (
                                    <span style={{ marginLeft: 6, fontSize: 10, background: '#f3f4f6', color: '#6b7280', padding: '1px 6px', borderRadius: 6 }}>
                                        {totalCount}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="search-wrap">
                        <MagnifyingGlassIcon style={{ width: 14, color: '#9ca3af', flexShrink: 0 }} />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search saved..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Panels */}
            <div style={{ position: 'relative', padding: '0 24px 48px', maxWidth: 1200, margin: '0 auto' }}>

                {/* Saved Spots */}
                <div className={`panel ${selected === "saved" ? "visible-panel" : "hidden-panel"}`}>
                    <div className="cards-grid">
                        {loading
                            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                            : filter(savedSpots).length > 0
                                ? filter(savedSpots).map((spot, index) => (
                                    <SpotCard key={spot.saved_id} data={spot} index={index} variant="saved" />
                                ))
                                : <EmptyState message="No saved spots yet." />
                        }
                    </div>
                </div>

                {/* Itineraries */}
                <div className={`panel ${selected === "itenerary" ? "visible-panel" : "hidden-panel"}`}>
                    <div className="cards-grid">
                        {loading
                            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                            : filter(itineraries).length > 0
                                ? filter(itineraries).map((itinerary, index) => (
                                    <SpotCard key={itinerary.itenerary_id} data={itinerary} index={index} variant="itinerary" />
                                ))
                                : <EmptyState message="No itineraries saved yet." />
                        }
                    </div>
                </div>

                {/* All */}
                <div className={`panel ${selected === "all" ? "visible-panel" : "hidden-panel"}`}>
                    <div className="cards-grid">
                        {loading
                            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                            : filter(allData).length > 0
                                ? filter(allData).map((data, index) => (
                                    <SpotCard
                                        key={data.saved_id ?? data.itenerary_id ?? index}
                                        data={data}
                                        index={index}
                                        variant={data.saved_id ? "saved" : "itinerary"}
                                    />
                                ))
                                : <EmptyState message="Nothing saved yet." />
                        }
                    </div>
                </div>

            </div>
        </section>
    )
}
