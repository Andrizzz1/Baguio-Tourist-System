import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from 'react-router-dom'

export const Transportation = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("jeepney")
  const contentRef = useRef(null)

  const switchTab = (id) => {
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
    { title: "Plaza – Trancoville", fare: "₱12 – ₱15", stops: ["City Hall", "Magsaysay Ave", "Trancoville"] },
    { title: "Plaza – Pacdal (Mines View)", fare: "₱13 – ₱18", stops: ["City Hall", "Leonard Wood Rd", "Wright Park", "Mines View"] },
    { title: "Session Rd – Aurora Hill", fare: "₱12 – ₱16", stops: ["Session Rd", "Easter Rd", "Aurora Hill"] },
    { title: "Plaza – Quezon Hill", fare: "₱12 – ₱15", stops: ["City Hall", "Naguilian Rd", "Quezon Hill"] },
    { title: "Plaza – Camp 7 / Kennon", fare: "₱15 – ₱22", stops: ["City Hall", "Marcos Hwy junction", "Camp 7"] },
  ]

  const taxiRoutes = [
    { from: "Burnham Park", to: "Botanical Garden", fare: "₱70–₱100", time: "5 – 10 min" },
    { from: "Burnham Park", to: "Baguio Cathedral", fare: "₱₱60–₱80", time: "10 – 15 min" },
    { from: "Burnham Park", to: "SM City Baguio", fare: "₱₱60–₱80", time: "15 – 25 min" },
    { from: "Burnham Park", to: "Baguio Night Market", fare: "₱50–₱70", time: "10 – 15 min" },
    { from: "Burnham Park", to: "Tam-Awan Village", fare: "₱₱120–₱180", time: "25 – 35 min" },
    { from: "Burnham Park", to: "BenCab Museum", fare: "₱180–₱250", time: "12 – 18 min" },
    { from: "Burnham Park", to: "Diplomat Hotel", fare: "₱70–₱100", time: "12 – 18 min" },
    { from: "Burnham Park", to: "Strawberry Farm", fare: "₱120–₱180", time: "12 – 18 min" },
    { from: "Burnham Park", to: "Camp John Hay", fare: "₱80–₱120", time: "12 – 18 min" },
    { from: "Burnham Park", to: "The Mansion", fare: "₱100–₱150", time: "12 – 18 min" },
    { from: "Burnham Park", to: "Wright Park", fare: "₱100–₱150", time: "12 – 18 min" },
    { from: "Burnham Park", to: "Mines View Park", fare: "₱120–₱180", time: "12 – 18 min" },
    { from: "Burnham Park", to: "Skyrise Baguio", fare: "₱100–₱160", time: "12 – 18 min" }, 
    { from: "Burnham Park", to: "Sunshine Park", fare: "₱60–₱100", time: "12 – 18 min" }, 
    { from: "Burnham Park", to: "The Great Wall of Baguio", fare: "₱120–₱180", time: "12 – 18 min" }, 
    { from: "Burnham Park", to: "Mt. Camisong Forest Park", fare: "₱500–₱800", time: "12 – 18 min" }, 
    { from: "Burnham Park", to: "Mount Pulag Jump-off Point", fare: "₱1,500–₱3,000+", time: "12 – 18 min" }, 
    { from: "Burnham Park", to: "Mount Kabunian Jump-off Point", fare: "₱₱2,000–₱4,000+", time: "12 – 18 min" }, 
  ]

  const busTerminals = [
    {
      name: "Victoy Liner",
      address: "PNR Compound, Utility Road, corner Marcovile Street, Upper Session Road",
      hours: "24 hours (varies per operator)",
      operators: "Victory Liner, Inc.",
      img: "https://scontent.fcrk1-1.fna.fbcdn.net/v/t39.30808-6/488925176_1187323796772934_6030573830205746662_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH3IyvtJDju_4_TSfDITZnOBNPh7oo0wE8E0-HuijTAT1_7Pd128IK8KEdsB35Oq2MELoCGsfpKlP9aB2cJyGyO&_nc_ohc=d-li5p5rHYIQ7kNvwHnVbjI&_nc_oc=AdpthcYbiwVvwbaMIXgryW6DHLJr8YjJxnDkKE46TNbQDViwzRhoEC_U1U1fmHFJuBE&_nc_zt=23&_nc_ht=scontent.fcrk1-1.fna&_nc_gid=24UlqUT9WFQehjP4xVEBaA&_nc_ss=7b2a8&oh=00_Af9SwHf3I-Y3xxrWtmDMqovJP7B09H11UJEdDLyhdLYVaw&oe=6A238DD1",
      link: "https://www.victoryliner.com/",
      destinations: [
        { place: "Manila (Cubao / Pasay)", fare: "₱470 – ₱780" },
        { place: "La Union", fare: "₱160 – ₱220" },
        { place: "Pangasinan (Dagupan)", fare: "₱200 – ₱280" },
      ],
    },
    {
      name: "Pangasinan Solid North",
      address: "Gov. Pack Rd, near City Hall",
      hours: "4:00 AM – 10:00 PM",
      operators: "JAC Liner Inc",
      img: "https://www.phbus.com/wp-content/uploads/2024/02/Solid-North-Bus-Terminal-Baguio-1.jpg",
      link: "https://solidnorthinc.com/",
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
      hours: "2:00 AM – 11:00 PM",
      operators: "Genesis Transport Service Inc.",
      img: "https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/504213750_1022018846795785_8124134482573428633_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHFpWbJNrn8RcjE3c8swGHGRvgBEbD0laNG-AERsPSVo5gyXySYCTGl1D3YfDi9CbbbmTA40i0Dy-3KG031f9s7&_nc_ohc=Wv18gTamleMQ7kNvwFmC1xt&_nc_oc=AdoW8-Txazlx6T49nbpEArbPm_0T_6ciMRsYCRcQ21pvCYCXeSA0Z_UMr70wNgUJjvg&_nc_zt=23&_nc_ht=scontent.fcrk1-5.fna&_nc_gid=uPXP7vOepnkX4R3pRSyipA&_nc_ss=7b2a8&oh=00_Af8B8iR3VZ1dJyERQjxPXF-fiI8YKPBxoNnzHD9X7hVWRA&oe=6A23B0C2",
      link: "https://genesistransport.com.ph",
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
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-fadeup { animation: fadeUp 0.4s ease both; }
        .anim-fadeup-1 { animation: fadeUp 0.4s ease 0.12s both; }
        .tab-content { animation: fadeUp 0.35s ease both; }
        .card-hover { transition: transform 0.2s, box-shadow 0.2s; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
      `}</style>

      <div className="min-h-screen bg-[#f4f6f5] p-6 font-sans">

          {/* ── Hero Header ── */}
        <div
          className="anim-fadeup relative rounded-2xl overflow-hidden p-8 mb-6 flex flex-col justify-between min-h-[210px]"
          style={{
            background: `linear-gradient(135deg, rgba(8,50,28,0.88) 0%, rgba(15,80,48,0.80) 100%), url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=80') center/cover no-repeat`,
            boxShadow: "0 8px 32px rgba(10,60,35,0.3)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(5,35,18,0.3) 0%, transparent 60%)" }} />

          {/* Top row */}
          <div className="relative z-10 flex justify-between items-start mb-5">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-white/80 flex items-center gap-1 px-3 py-2 rounded-xl border border-white/20 backdrop-blur-sm cursor-pointer"
              style={{ background: "rgba(255,255,255,0.12)" }}
            >
              ← back to dashboard
            </button>
            <span
              className="text-xs font-semibold text-white px-4 py-1.5 rounded-full border border-white/25"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)" }}
            >
              🗺 Travel Guide
            </span>
          </div>

          {/* Centered Body */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <h1 className="text-5xl font-extrabold text-white mb-2 leading-tight" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.25)" }}>
              Transportation in Baguio City
            </h1>
            <p className="text-sm text-white/75 leading-relaxed max-w-lg mb-4">
              A simple guide to help you move around Baguio using taxis, jeepneys, and bus terminals.
              Use the estimates below to plan your day.
            </p>
            <div
              className="inline-flex items-center gap-2 text-sm rounded-xl px-4 py-2"
              style={{
                background: "rgba(255,248,180,0.12)",
                border: "1px solid rgba(255,235,100,0.3)",
                color: "#fff8cc",
                backdropFilter: "blur(4px)",
              }}
            >
              <span>ⓘ</span>
              <span>All fares are estimated and may vary depending on traffic and conditions.</span>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="anim-fadeup-1 inline-flex gap-1.5 bg-white border border-gray-200 rounded-full p-1.5 mb-5 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer border-none
                ${activeTab === tab.id
                  ? "bg-[#1a9e6e] text-white shadow-md"
                  : "bg-transparent text-gray-400 hover:bg-[#e8f5f0] hover:text-[#1a9e6e]"
                }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div ref={contentRef} className="tab-content">

          {/* Jeepney */}
          {activeTab === "jeepney" && (
            <div className="grid grid-cols-2 gap-3.5">
              {jeepneyRoutes.map((route, i) => (
                <div
                  key={i}
                  className="card-hover bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
                  style={{ animation: `fadeUp 0.35s ease ${i * 0.07}s both` }}
                >
                  <div className="flex justify-between items-center mb-3 gap-2">
                    <span className="text-[15px] font-bold text-gray-900">{route.title}</span>
                    <span className="bg-[#e8f5f0] text-[#1a9e6e] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      {route.fare}
                    </span>
                  </div>
                  <div className="flex items-center flex-wrap gap-1.5">
                    {route.stops.map((stop, j) => (
                      <span key={j} className="flex items-center gap-1.5">
                        <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">{stop}</span>
                        {j < route.stops.length - 1 && <span className="text-gray-300 text-xs">→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Taxi */}
          {activeTab === "taxi" && (
            <div className="grid grid-cols-3 gap-3.5">
              {taxiRoutes.map((route, i) => (
                <div
                  key={i}
                  className="card-hover bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
                  style={{ animation: `fadeUp 0.35s ease ${i * 0.07}s both` }}
                >
                  <div className="text-xs text-[#1a9e6e] font-semibold mb-1">📍 Route</div>
                  <div className="flex items-center gap-1.5 text-[15px] font-bold text-gray-900 mb-3">
                    <span>{route.from}</span>
                    <span className="text-gray-300 font-normal">→</span>
                    <span>{route.to}</span>
                  </div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Estimated Fare</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold text-gray-900">{route.fare}</span>
                    <span className="bg-[#e8f5f0] text-[#1a9e6e] text-xs font-semibold px-3 py-1 rounded-full">
                      🕐 {route.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bus */}
          {activeTab === "bus" && (
            <div className="grid grid-cols-2 gap-3.5">
              {busTerminals.map((terminal, i) => (
                <div
                  key={i}
                  className="card-hover bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
                  style={{ animation: `fadeUp 0.35s ease ${i * 0.08}s both` }}
                >
               {/* Image */}
                  <div className="relative h-36 overflow-hidden bg-gradient-to-br from-[#d0ebe0] to-[#b8ddd0]">
                    {terminal.img ? (
                      <img
                        src={terminal.img}
                        alt={terminal.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none"
                          e.target.parentNode.classList.add("flex", "items-center", "justify-center")
                          e.target.parentNode.innerHTML = '<span style="font-size:36px">🚌</span>'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🚌
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-indigo-50 rounded-xl w-10 h-10 flex items-center justify-center text-lg flex-shrink-0">
                        🚌
                      </div>
                      <div>
                        <div className="text-[15px] font-bold text-gray-900">{terminal.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">📍 {terminal.address}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">🕐 {terminal.hours}</span>
                      <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full">🏢 {terminal.operators}</span>
                    </div>

                    <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold border-t border-gray-100 pt-3 mb-2">
                      Destinations & Estimated Fares
                    </div>

                    {terminal.destinations.map((dest, j) => (
                      <div
                        key={j}
                        className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-none text-sm text-gray-700"
                      >
                        <span>{dest.place}</span>
                        <span className="text-[#1a9e6e] font-bold">{dest.fare}</span>
                      </div>
                    ))}

                    {terminal.link && (
                      <a href={terminal.link} target="_blank" rel="noopener noreferrer" className="mt-4 w-full flex items-center justify-center gap-2 bg-[#e8f5f0] hover:bg-[#1a9e6e] text-[#1a9e6e] hover:text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200">
                        🌐 For more information, visit their site
                      </a>
                    )}

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  )
}