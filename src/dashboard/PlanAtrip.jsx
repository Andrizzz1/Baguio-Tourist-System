import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { CalendarDaysIcon, UsersIcon, WalletIcon } from '@heroicons/react/24/outline'
export const Planterip = () => {
  const navigate = useNavigate()
  const [travelCount, setTravelCount] = useState(1)
  const [budget, setBudget] = useState("budget")
  const [tripPace, setTripPace] = useState("chill")
  const [interests, setInterests] = useState([])
  const [generate, setGenerate] = useState("details")
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const budgetOptions = [
    { id: "budget", label: "Budget", desc: "₱" },
    { id: "comfort", label: "Comfort", desc: "₱₱" },
    { id: "luxury", label: "Luxury", desc: "₱₱₱" },
  ]

  const tripPaceOptions = [
    { id: "chill", label: "Chill" },
    { id: "balanced", label: "Balanced" },
    { id: "packed", label: "Packed" },
  ]

  const userPicks = [
    { id: "Nature", label: "Nature & Parks" },
    { id: "Food", label: "Local Food" },
    { id: "Culture", label: "Culture & Arts" },
    { id: "Cafe", label: "Cafe" },
    { id: "Adventure", label: "Adventure" },
    { id: "Scenic", label: "Scenic View" },
  ]


  const days = startDate && endDate
  ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
  : 0;


  const dayColumns = Array.from({ length: days }, (_, i) => i + 1);

  const toggleInterest = (id) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      {/* Back button */}
      <button onClick={()=>{navigate("/dashboard")}} className="text-sm text-gray-500 hover:text-black flex items-center gap-1 mb-4 cursor-pointer">
        ← back to dashboard
      </button>

      <h1 className="font-semibold text-3xl text-gray-900">Plan a trip</h1>
      <p className="text-sm text-gray-500 mt-1">
        Tell us about your trip and we'll craft an itinerary for you.
      </p>

      {/* Stepper */}
      <div className="flex items-center gap-2 text-sm mt-4 mb-6">
        <div className="flex items-center gap-1.5">
          <span className="bg-green-700 w-6 h-6 text-white text-xs rounded-full flex items-center justify-center font-medium">
            1
          </span>
          <span className="font-medium text-gray-900">Trip details</span>
        </div>
        <div className="w-8 h-px bg-gray-300" />
        <div className="flex items-center gap-1.5">
          <span className="bg-gray-100 border border-gray-300 w-6 h-6 text-gray-400 text-xs rounded-full flex items-center justify-center">
            2
          </span>
          <span className="text-gray-400">Your itinerary</span>
        </div>
      </div>

      {/* Layout */}
      {generate === "details" ?(
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Form card */}
        <div className="lg:col-span-2 border border-gray-200 rounded-xl shadow-sm p-6 text-sm bg-white">
          <h2 className="font-semibold text-lg text-gray-900">Trip details</h2>
          <p className="text-gray-500 text-xs mt-1 mb-4">
            A few quick questions to personalize your plan.
          </p>
          <hr className="border-gray-100 mb-5" />

          {/* Destination */}
          <div className="flex flex-col mb-4">
            <label htmlFor="destination" className="font-medium text-gray-800 mb-1">
              Destination
            </label>
            <input
              id="destination"
              type="text"
              placeholder="Where do you want to go?"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-500"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex flex-col">
              <label htmlFor="startDate" className="font-medium text-gray-800 mb-1">
                Start date
              </label>
              <input
                onChange={(e)=> setStartDate(e.target.value)}  
                value={startDate}
                id="startDate"
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="endDate" className="font-medium text-gray-800 mb-1">
                End date
              </label>
              <input
                onChange={(e)=> setEndDate(e.target.value)}
                value={endDate}
                id="endDate"
                type="date"
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-500"
              />
            </div>
          </div>

          {/* Travelers */}
          <div className="mb-4">
            <label className="font-medium text-gray-800 block mb-1">Travelers</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTravelCount((prev) => Math.max(1, prev - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-100 transition"
              >
                −
              </button>
              <span className="text-base font-medium w-5 text-center">{travelCount}</span>
              <button
                onClick={() => setTravelCount((prev) => prev + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Budget */}
          <div className="mb-4">
            <label className="font-medium text-gray-800 block mb-1">Budget</label>
            <div className="grid grid-cols-3 gap-2">
              {budgetOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setBudget(option.id)}
                  className={`border rounded-xl py-2 px-3 text-center transition ${
                    budget === option.id
                      ? "bg-green-50 border-green-500"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      budget === option.id ? "text-green-800" : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      budget === option.id ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {option.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Trip Pace */}
          <div className="mb-4">
            <label className="font-medium text-gray-800 block mb-1">Trip pace</label>
            <div className="grid grid-cols-3 gap-2">
              {tripPaceOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setTripPace(option.id)}
                  className={`border rounded-xl py-3 text-center text-sm transition ${
                    tripPace === option.id
                      ? "bg-green-50 border-green-500 font-medium text-green-800"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="mb-4">
            <label className="font-medium text-gray-800 block mb-1">
              What are you into?{" "}
              <span className="font-normal text-gray-400">(pick a few)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {userPicks.map((option) => (
                <button
                  key={option.id}
                  onClick={() => toggleInterest(option.id)}
                  className={`border rounded-full py-1.5 px-4 text-xs transition ${
                    interests.includes(option.id)
                      ? "bg-green-50 border-green-500 text-green-800 font-medium"
                      : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-6">
            <button onClick={()=>{setGenerate("generate")}} className="bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition cursor-pointer">
              Generate itinerary
            </button>
          </div>
        </div>

        {/* Tips sidebar */}
        <div className="lg:col-span-1 bg-gray-50 border border-gray-100 rounded-xl p-5 text-sm h-fit">
          <h2 className="font-semibold text-green-700 mb-3">💡 Tips for Baguio</h2>
          <ul className="flex flex-col gap-2.5">
            {[
              "Cool climate year-round — pack a light jacket",
              "Peak season is March–May. Book early!",
              "Traffic gets heavy on weekends — plan around it",
              "Try local strawberry taho and ube jam",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-600 leading-snug">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
      ):(<div>
        <div className="bg-linear-to-r from-green-700 to-green-400 py-6 px-5 rounded-2xl">
          <p className="text-xs text-gray-300">YOUR TRIP</p>
          <h2 className="text-white font-semibold text-xl my-3">Baguio City</h2>
          <div className="flex gap-1 text-sm text-white">
            <CalendarDaysIcon className="h-5 w-5" />
            {startDate?startDate:'start'}

            <p>→</p>
            {endDate?endDate:'end'}

            <div className="flex ml-4">
              <UsersIcon className="h-5 w-5" />
              {travelCount} travelers
            </div>
            <div className="flex ml-4">
              <WalletIcon className="h-5 w-5" />
              {budget}
            </div>
            <div className="flex ml-4">
              {tripPace}
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          {dayColumns.map((day) => (
            <div key={day} className="border rounded-lg p-4 w-80">
              <p className="text-green-600 text-sm">DAY {day}</p>
              <h2 className="font-bold text-lg">Day {day} Title</h2>

              {/* activities list here */}
            </div>
          ))}
        </div>
      
      </div>)}


    </div>
  )
}