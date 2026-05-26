import { DashboardNav } from "../dashboard/DashboardNav"
import { BookmarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from "react"

const globalStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.94); }
    to   { opacity: 1; transform: scale(1); }
  }

  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  .saved-card {
    opacity: 0;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.3s ease;
  }

  .saved-card:hover {
    transform: translateY(-6px) scale(1.02) !important;
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
  }

  .saved-card img {
    transition: transform 0.5s ease;
  }

  .saved-card:hover img {
    transform: scale(1.06);
  }

  .tab-pill {
    position: relative;
    cursor: pointer;
    padding: 6px 18px;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.25s ease, background 0.25s ease, transform 0.2s ease;
    color: #9ca3af;
  }

  .tab-pill:hover {
    color: #4b5563;
    background: rgba(255,255,255,0.6);
  }

  .tab-pill.active {
    background: white;
    color: #059669;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transform: scale(1.05);
  }

  .panel {
    transition: opacity 0.35s ease, transform 0.35s ease;
  }

  .panel.hidden-panel {
    opacity: 0;
    transform: translateY(8px);
    pointer-events: none;
    position: absolute;
    inset: 0;
  }

  .panel.visible-panel {
    opacity: 1;
    transform: translateY(0);
    position: relative;
  }

  .search-input {
    transition: all 0.3s ease;
    border-bottom: 1.5px solid transparent;
    background: transparent;
    outline: none;
    width: 140px;
  }

  .search-input:focus {
    border-bottom-color: #059669;
    width: 200px;
  }

  .hero-banner {
    animation: scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .navbar-wrap {
    animation: slideDown 0.5s ease 0.2s both;
  }

  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 400px 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 16px;
  }

  .empty-state {
    animation: fadeIn 0.5s ease forwards;
  }

  .badge-chip {
    transition: background 0.2s ease, color 0.2s ease;
  }
`

const SkeletonCard = () => (
    <div className="w-64 m-2">
        <div className="skeleton h-44 w-full mb-2" />
        <div className="skeleton h-4 w-3/4 mb-1" style={{ borderRadius: 8 }} />
        <div className="skeleton h-3 w-1/2" style={{ borderRadius: 8 }} />
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
        <div
            ref={ref}
            className="saved-card w-64 bg-white rounded-2xl overflow-hidden m-2 cursor-pointer"
            style={{
                boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                border: "1px solid rgba(0,0,0,0.05)",
            }}
        >
            <div style={{ overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
                <img
                    src={data.spot_image}
                    alt={data.spot_name}
                    className="w-full h-44 object-cover"
                />
            </div>
            <div className="p-4">
                {variant === "itinerary" && (
                    <span
                        className="badge-chip inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2"
                        style={{ background: "#d1fae5", color: "#065f46" }}
                    >
                        Itinerary
                    </span>
                )}
                {variant === "saved" && (
                    <span
                        className="badge-chip inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2"
                        style={{ background: "#e0f2fe", color: "#0369a1" }}
                    >
                        Saved
                    </span>
                )}
                <h3 className="font-bold text-base text-gray-800 leading-tight">{data.spot_name}</h3>
                <p className="text-gray-500 text-sm mt-0.5">{data.spot_location}</p>
            </div>
        </div>
    )
}

const EmptyState = ({ message }) => (
    <div
        className="empty-state flex flex-col items-center justify-center py-20 w-full"
        style={{ opacity: 0 }}
    >
        <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "#f0fdf4", display: "flex",
            alignItems: "center", justifyContent: "center",
            marginBottom: 16,
            animation: "scaleIn 0.4s ease forwards"
        }}>
            <BookmarkIcon style={{ width: 28, color: "#6ee7b7" }} />
        </div>
        <p className="text-gray-400 text-sm">{message}</p>
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

    return (
        <section>
            <style>{globalStyles}</style>
            <DashboardNav />

            {/* Hero banner */}
            <div className="flex justify-center m-5">
                <div
                    className="hero-banner nc-card relative overflow-hidden p-10 rounded-3xl bg-cover bg-center text-white w-7xl"
                    style={{
                        backgroundImage: `linear-gradient(120deg, rgba(4, 120, 87, 0.92), rgba(6, 95, 70, 0.72)), url('/imgs/bg.png')`,
                        opacity: 0,
                    }}
                >
                    <div className="flex items-center gap-1" style={{ animation: "fadeIn 0.5s ease 0.3s both" }}>
                        <BookmarkIcon className="w-5" />
                        <p className="text-sm">Your collection</p>
                    </div>
                    <h1
                        className="text-4xl font-semibold text-emerald-50"
                        style={{ animation: "fadeUp 0.6s ease 0.35s both" }}
                    >
                        Saved places & itineraries
                    </h1>
                    <p
                        className="nc-subtitle max-w-xl text-emerald-100"
                        style={{ animation: "fadeUp 0.6s ease 0.45s both" }}
                    >
                        Everything you've bookmarked across Baguio — spots to revisit, food to try, and trips to plan.
                    </p>
                </div>
            </div>

            {/* Mini navbar */}
            <div className="flex justify-center navbar-wrap">
                <div className="flex justify-between w-7xl mx-5 bg-gray-100 rounded-2xl p-2">
                    <ul className="flex flex-wrap gap-1 items-center">
                        {tabs.map((tab) => (
                            <li
                                key={tab.key}
                                onClick={() => setSelected(tab.key)}
                                className={`tab-pill ${selected === tab.key ? "active" : ""}`}
                            >
                                {tab.label}
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-2">
                        <MagnifyingGlassIcon
                            className="w-4 h-4 text-gray-400"
                            style={{ transition: "color 0.2s ease" }}
                        />
                        <input
                            type="text"
                            className="search-input text-sm text-gray-700 placeholder-gray-400"
                            placeholder="Search saved..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Panels */}
            <div className="relative mt-2">

                {/* Saved Spots */}
                <div className={`panel flex flex-wrap justify-around lg:mx-20 ${selected === "saved" ? "visible-panel" : "hidden-panel"}`}>
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                        : filter(savedSpots).length > 0
                            ? filter(savedSpots).map((spot, index) => (
                                <SpotCard key={spot.saved_id} data={spot} index={index} variant="saved" />
                            ))
                            : <EmptyState message="No saved spots yet." />
                    }
                </div>

                {/* Itineraries */}
                <div className={`panel flex flex-wrap justify-around lg:mx-20 ${selected === "itenerary" ? "visible-panel" : "hidden-panel"}`}>
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                        : filter(itineraries).length > 0
                            ? filter(itineraries).map((itinerary, index) => (
                                <SpotCard key={itinerary.itenerary_id} data={itinerary} index={index} variant="itinerary" />
                            ))
                            : <EmptyState message="No itineraries saved yet." />
                    }
                </div>

                {/* All */}
                <div className={`panel flex flex-wrap justify-around lg:mx-20 ${selected === "all" ? "visible-panel" : "hidden-panel"}`}>
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
        </section>
    )
}