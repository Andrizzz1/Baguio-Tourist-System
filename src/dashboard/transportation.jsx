import { useState, useEffect, useRef } from "react"
import './css/transportation.css'
import { useNavigate } from 'react-router-dom'
const fadeUpStyle = {
  animation: "fadeUp 0.45s ease both",
}

const cardStyle = (delay = 0) => ({
  animation: `fadeUp 0.4s ease ${delay}s both`,
})

export const Transportation = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("jeepney")
  const [prevTab, setPrevTab] = useState(null)
  const contentRef = useRef(null)

  const switchTab = (id) => {
    setPrevTab(activeTab)
    setActiveTab(id)
  }

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.animation = "none"
      void contentRef.current.offsetHeight
      contentRef.current.style.animation = "fadeUp 0.35s ease both"
    }
  }, [activeTab])

  const jeepneyRoutes = [
    {
      title: "Plaza – Trancoville",
      fare: "₱12 – ₱15",
      stops: ["City Hall", "Magsaysay Ave", "Trancoville"],
    },
    {
      title: "Plaza – Pacdal (Mines View)",
      fare: "₱13 – ₱18",
      stops: ["City Hall", "Leonard Wood Rd", "Wright Park", "Mines View"],
    },
    {
      title: "Session Rd – Aurora Hill",
      fare: "₱12 – ₱16",
      stops: ["Session Rd", "Easter Rd", "Aurora Hill"],
    },
    {
      title: "Plaza – Quezon Hill",
      fare: "₱12 – ₱15",
      stops: ["City Hall", "Naguilian Rd", "Quezon Hill"],
    },
    {
      title: "Plaza – Camp 7 / Kennon",
      fare: "₱15 – ₱22",
      stops: ["City Hall", "Marcos Hwy junction", "Camp 7"],
    },
  ]

  const taxiRoutes = [
    { from: "Burnham Park", to: "Session Road", fare: "₱60 – ₱90", time: "5 – 10 min" },
    { from: "Session Road", to: "Camp John Hay", fare: "₱120 – ₱180", time: "10 – 15 min" },
    { from: "Burnham Park", to: "Mines View Park", fare: "₱150 – ₱220", time: "15 – 25 min" },
    { from: "Session Road", to: "Wright Park", fare: "₱100 – ₱150", time: "10 – 15 min" },
    { from: "SM Baguio", to: "BenCab Museum", fare: "₱250 – ₱350", time: "25 – 35 min" },
    { from: "Burnham Park", to: "The Mansion", fare: "₱130 – ₱190", time: "12 – 18 min" },
  ]

  const busTerminals = [
    {
      name: "Gov. Pack Road Terminal",
      address: "Gov. Pack Rd, near City Hall",
      hours: "24 hours (varies per operator)",
      operators: "Victory Liner, Genesis",
      destinations: [
        { place: "Manila (Cubao / Pasay)", fare: "₱470 – ₱780" },
        { place: "La Union", fare: "₱160 – ₱220" },
        { place: "Pangasinan (Dagupan)", fare: "₱200 – ₱280" },
      ],
    },
    {
      name: "Dangwa Terminal",
      address: "Magsaysay Ave, near Center Mall",
      hours: "4:00 AM – 8:00 PM",
      operators: "Local Benguet operators",
      destinations: [
        { place: "La Trinidad, Benguet", fare: "₱20 – ₱30" },
        { place: "Sagada, Mt. Province", fare: "₱220 – ₱280" },
        { place: "Bontoc", fare: "₱250 – ₱320" },
        { place: "Kabayan / Buguias", fare: "₱180 – ₱250" },
      ],
    },
    {
      name: "Genesis / Joy Bus",
      address: "Slaughterhouse Area, Magsaysay Ave",
      hours: "5:00 AM – 9:00 PM",
      operators: "Genesis Transport, Joy Bus",
      destinations: [
        { place: "Manila (Pasay / Cubao)", fare: "₱500 – ₱850" },
        { place: "Dagupan", fare: "₱210 – ₱290" },
        { place: "San Fernando, La Union", fare: "₱170 – ₱230" },
      ],
    },
  ]

  const tabs = [
    { id: "jeepney", label: "Jeepney", emoji: "🚌" },
    { id: "taxi", label: "Taxi", emoji: "🚖" },
    { id: "bus", label: "Bus", emoji: "🚍" },
  ]

  return (
    <>
      <div className="transport-wrap">
        {/* Header */}
        <div className="flex justify-between flex-row-reverse">
          <p className="transport-badge ">🗺 Travel Guide</p>
            <button onClick={()=>{navigate("/dashboard")}} className="text-sm text-gray-500 hover:text-black flex items-center gap-1 mb-4 cursor-pointer">
            ← back to dashboard
          </button>
          </div>

        <h1 className="transport-title">Transportation in Baguio City</h1>
        <p className="transport-sub">
          Move around Baguio with ease — taxis, jeepneys, and bus terminals all in one place.
        </p>
        <div className="info-banner">
          <span>ⓘ</span>
          <span>All fares are estimated and may vary depending on traffic and conditions.</span>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => switchTab(tab.id)}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef}>
          {/* Jeepney */}
          {activeTab === "jeepney" && (
            <div className="content-grid-2">
              {jeepneyRoutes.map((route, i) => (
                <div
                  key={i}
                  className="route-card"
                  style={{ animation: `fadeUp 0.35s ease ${i * 0.06}s both` }}
                >
                  <div className="route-header">
                    <span className="route-title">{route.title}</span>
                    <span className="fare-badge">{route.fare}</span>
                  </div>
                  <div className="stops-row">
                    {route.stops.map((stop, j) => (
                      <span key={j} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span className="stop-pill">{stop}</span>
                        {j < route.stops.length - 1 && <span className="stop-arrow">→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Taxi */}
          {activeTab === "taxi" && (
            <div className="content-grid-3">
              {taxiRoutes.map((route, i) => (
                <div
                  key={i}
                  className="taxi-card"
                  style={{ animation: `fadeUp 0.35s ease ${i * 0.06}s both` }}
                >
                  <div className="taxi-route">
                    <span className="taxi-from">{route.from}</span>
                    <span style={{ color: "#aaa", margin: "0 6px" }}>→</span>
                    <span className="taxi-from">{route.to}</span>
                  </div>
                  <div className="fare-label">Estimated Fare</div>
                  <div className="taxi-fare-row">
                    <span className="taxi-fare">{route.fare}</span>
                    <span className="time-badge">🕐 {route.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bus */}
          {activeTab === "bus" && (
            <div className="content-grid-2">
              {busTerminals.map((terminal, i) => (
                <div
                  key={i}
                  className="bus-card"
                  style={{ animation: `fadeUp 0.35s ease ${i * 0.08}s both` }}
                >
                  <div className="bus-header">
                    <div className="bus-icon-wrap">🚌</div>
                    <div>
                      <div className="bus-name">{terminal.name}</div>
                      <div className="bus-address">📍 {terminal.address}</div>
                    </div>
                  </div>
                  <div className="bus-meta">
                    <span>🕐 {terminal.hours}</span>
                    <span>🏢 {terminal.operators}</span>
                  </div>
                  <div className="dest-section-label">Destinations & Estimated Fares</div>
                  {terminal.destinations.map((dest, j) => (
                    <div key={j} className="dest-row">
                      <span>{dest.place}</span>
                      <span className="dest-fare">{dest.fare}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
