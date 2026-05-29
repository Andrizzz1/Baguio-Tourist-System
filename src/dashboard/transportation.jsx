import { useState } from "react";

export const Transportation = () => {
  const [activeTab, setActiveTab] = useState("jeepney");

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
  ];

  const taxiRoutes = [
    { from: "Burnham Park", to: "Session Road", fare: "₱60 – ₱90", time: "5 – 10 min" },
    { from: "Session Road", to: "Camp John Hay", fare: "₱120 – ₱180", time: "10 – 15 min" },
    { from: "Burnham Park", to: "Mines View Park", fare: "₱150 – ₱220", time: "15 – 25 min" },
    { from: "Session Road", to: "Wright Park", fare: "₱100 – ₱150", time: "10 – 15 min" },
    { from: "SM Baguio", to: "BenCab Museum", fare: "₱250 – ₱350", time: "25 – 35 min" },
    { from: "Burnham Park", to: "The Mansion", fare: "₱130 – ₱190", time: "12 – 18 min" },
  ];

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
      name: "Genesis/Joy Bus",
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
  ];

  const tabs = [
    { id: "taxi", label: "Taxi", icon: "🚖" },
    { id: "jeepney", label: "Jeepney", icon: "🚌" },
    { id: "bus", label: "Bus", icon: "🚍" },
  ];

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", padding: "20px", background: "#f8f9fa", minHeight: "100vh" }}>

      {/* ── HEADER SECTION ── */}
      <div style={{ marginBottom: "28px" }}>

        {/* Travel Assistant Badge */}
        <div style={{
          display: "inline-block",
          border: "1.5px solid #2d7a5e",
          borderRadius: "20px",
          padding: "4px 14px",
          fontSize: "12px",
          fontWeight: "600",
          color: "#2d7a5e",
          marginBottom: "14px",
          background: "white",
        }}>
          Travel Assistant
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "34px",
          fontWeight: "800",
          color: "#111",
          margin: "0 0 10px 0",
          lineHeight: "1.2",
        }}>
          Transportation in Baguio City
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: "15px",
          color: "#666",
          margin: "0 0 18px 0",
          lineHeight: "1.6",
          maxWidth: "620px",
        }}>
          A simple guide to help you move around Baguio using taxis, jeepneys, and bus terminals. Use the estimates below to plan your day.
        </p>

        {/* Info Banner */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "#fffde7",
          border: "1.5px solid #f0d88a",
          borderRadius: "12px",
          padding: "12px 18px",
          maxWidth: "720px",
        }}>
          <span style={{ fontSize: "16px", flexShrink: 0 }}>ⓘ</span>
          <span style={{ fontSize: "14px", color: "#7a5c00" }}>
            All fares are estimated and may vary depending on traffic and conditions.
          </span>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 20px", borderRadius: "50px",
              border: `1.5px solid ${activeTab === tab.id ? "#333" : "#e0e0e0"}`,
              background: "white", cursor: "pointer",
              fontSize: "14px", fontWeight: activeTab === tab.id ? "600" : "500",
              color: activeTab === tab.id ? "#111" : "#555",
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ── JEEPNEY ── */}
      {activeTab === "jeepney" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {jeepneyRoutes.map((route, i) => (
            <div key={i} style={{ background: "white", border: "1.5px solid #e8e8e8", borderRadius: "12px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <span style={{ fontSize: "17px", fontWeight: "600", color: "#111" }}>{route.title}</span>
                <span style={{ background: "#e8f5f0", color: "#1a9e6e", fontSize: "12px", fontWeight: "600", padding: "4px 10px", borderRadius: "20px" }}>
                  {route.fare}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                {route.stops.map((stop, j) => (
                  <span key={j} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ background: "#f0f0f0", padding: "5px 12px", borderRadius: "20px", fontSize: "13px", color: "#444" }}>
                      {stop}
                    </span>
                    {j < route.stops.length - 1 && <span style={{ color: "#999", fontSize: "13px" }}>→</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAXI ── */}
      {activeTab === "taxi" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
          {taxiRoutes.map((route, i) => (
            <div key={i} style={{ background: "white", border: "1.5px solid #e8e8e8", borderRadius: "12px", padding: "20px" }}>
              <div style={{ fontSize: "14px", color: "#333", marginBottom: "12px" }}>
                📍 {route.from} → {route.to}
              </div>
              <div style={{ fontSize: "11px", color: "#888", letterSpacing: "0.5px", fontWeight: "500", textTransform: "uppercase", marginBottom: "4px" }}>
                Estimated Fare
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "20px", fontWeight: "700", color: "#111" }}>{route.fare}</span>
                <span style={{ background: "#e8f5f0", color: "#1a9e6e", fontSize: "12px", fontWeight: "500", padding: "4px 10px", borderRadius: "20px" }}>
                  🕐 {route.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── BUS ── */}
      {activeTab === "bus" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {busTerminals.map((terminal, i) => (
            <div key={i} style={{ background: "white", border: "1.5px solid #e8e8e8", borderRadius: "12px", padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "14px" }}>
                <div style={{ background: "#eef2ff", borderRadius: "10px", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "20px" }}>
                  🚌
                </div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "2px" }}>{terminal.name}</div>
                  <div style={{ fontSize: "13px", color: "#888" }}>{terminal.address}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "20px", marginBottom: "14px" }}>
                <span style={{ fontSize: "12.5px", color: "#555" }}>🕐 {terminal.hours}</span>
                <span style={{ fontSize: "12.5px", color: "#555" }}>ℹ️ {terminal.operators}</span>
              </div>
              <div style={{ fontSize: "11px", color: "#888", letterSpacing: "0.5px", fontWeight: "600", textTransform: "uppercase", borderTop: "1px solid #f0f0f0", paddingTop: "12px", marginBottom: "8px" }}>
                Destinations & Estimated Fares
              </div>
              {terminal.destinations.map((dest, j) => (
                <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: "1px solid #f8f8f8", fontSize: "14px", color: "#333" }}>
                  <span>{dest.place}</span>
                  <span style={{ color: "#1a9e6e", fontWeight: "600" }}>{dest.fare}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
