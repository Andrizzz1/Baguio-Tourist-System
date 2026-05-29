import { useState } from "react"

export const Planterip = ()=>{
    const [travelCount, setTravelCount] = useState(1);
    const [Budget, setBudget] = useState("budget");
    const [tripPace, setTripPace] = useState("chill");
    const [interst, setInterest] = useState([]);
    const budget = [
            { id: "budget", label: "Budget", desc: "₱" },
            { id: "comfort", label: "Comfort", desc: "₱₱" },
            { id: "luxury", label: "Luxury", desc: "₱₱₱" }
    ]

    const TripPaceOptions =[
        {id: "chill", label: "Chill"},
        {id: "balanced", label: "Balanced"},
        {id: "packed", label: "Packed"}
    ]

    const userPicks =[
        {id: "Nature", label: "Nature &  Parks"},
        {id: "Food", label: "Local Food"},
        {id: "Culture&Arts", label: "Culture &  Arts"},
        {id: "Cafe", label: "Cafe"},
        {id: "Adventure", label: "Adventure"},
        {id: "ScenicView", label: "Scenic View"}
    ]
    return <div className="mx-20 ">
        <button className="text-sm text-gray-500 cursor-pointer hover:text-black">back to dashboard</button>
        <h1 className="font-semibold text-4xl">Plan a Trip</h1>
        <p className="text-sm text-gray-500 cursor-pointer mt-2">Tell us about your trip and we'll craft an itinerary for you.</p>

        <div className="flex items-center gap-1 text-sm mt-3">
            <div className="flex items-center gap-1">
                <p className="bg-green-600 w-6 h-6 text-center text-white rounded-full">1</p> 
                <p>Trip details</p>
            </div>
            <div className="w-10 h-px bg-gray-300"></div>
            <div className="flex gap-1">
                <p className="bg-gray-100 w-6 h-1 text-gray-400 text-center rounded-full">2</p> 
                <p>Your itinerary</p>               
            </div>
        </div>

        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1 mt-5">
            <div className="col-span-2 shadow-2xl rounded-xl border border-gray-200 p-5 text-sm">
                <h2 className="font-semibold text-xl">Trip details</h2>
                <p className="text-gray-500">A few quick questions to personalize your plan.</p>
                <div className="flex flex-col my-3">
                    <label htmlFor="destination" className="font-semibold">Destination</label>
                    <input className="border border-gray-300 rounded-lg p-2 mt-1"  id="destination" type="text" placeholder='Where do you want to go?'/>
                </div>

                <div className="grid grid-cols-2 gap-1 mb-3">
                    <div className="flex flex-col">
                        <label htmlFor="StartDate" className="font-semibold">Start date</label>
                        <input className="border border-gray-300 rounded-lg p-2 " id="StartDate" type="date"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="EndDate" className="font-semibold">End date</label>
                        <input className="border border-gray-300 rounded-lg p-2 " id="EndDate"  type="date"/>
                    </div>

                </div>
                
                <label htmlFor="Travel" className="font-semibold">Travelers</label>
                <div id="Travel" className="flex items-center gap-2 mb-3 mt-1">
                    <button className="border border-gray-400 w-6 h-6 rounded-full" onClick={()=>{
                        if(travelCount === 1){
                            return 1
                        }
                        setTravelCount(prev => prev - 1)}}>-</button>
                    <p>{travelCount}</p>
                    <button className="border border-gray-400 w-6 h-6 rounded-full" onClick={()=>{setTravelCount(prev => prev + 1)}}>+</button>
                </div>

                <label htmlFor="budgetOptions" className="font-semibold">Budget</label>
                <div id="budgetOptions" className="grid grid-cols-3 gap-3 mb-3 mt-1">
                    {budget.map((options) =>(
                        <button onClick={()=>{
                            setBudget(options.id)
                        }} key={options.id} className={`border border-gray-200 rounded-xl py-1 px-2 text-gray-500 ${Budget === options.id?"bg-green-100 border-green-400" : null}`}>
                            <p className={Budget === options.id?" text-black font-semibold":null}>{options.label}</p>
                            <p className={Budget === options.id?" text-black":null}>{options.desc}</p>
                        </button>
                    ))}
                </div>

                <label htmlFor="TripPace" className="font-semibold">Trip pace</label>
                <div id="TripPace" className="grid grid-cols-3 gap-3 mb-3 mt-1">
                    {TripPaceOptions.map((options) =>(
                        <button onClick={()=>{
                            setTripPace(options.id)
                        }} key={options.id} className={`text-center border border-gray-200 rounded-xl py-3 px-3 text-gray-500 ${tripPace === options.id?"font-semibold text-black bg-green-100 border-green-400" : null}`}>
                            {options.label}
                        </button>
                    ))}
                </div>

                <label htmlFor="AskUser" className="font-semibold">What are you into?<span className="text-gray-400 font-medium">(pick a few)</span></label>
                <div id="AskUser" className="flex justify-around flex-wrap text-xs mt-1">
                    {userPicks.map((options) =>(
                        <button
                            onClick={() => {
                                setBudget(prev =>
                                    prev.includes(options.id)
                                        ? prev.filter(id => id !== options.id)
                                        : [...prev, options.id]
                                )
                            }}
                            key={options.id}
                            className={`border rounded-xl py-1 px-2 text-gray-500 ${
                                Budget.includes(options.id) ? "bg-green-100 border-green-400" : "border-gray-200"
                            }`}>
                            <p className={Budget.includes(options.id) ? "text-black font-semibold" : null}>{options.label}</p>
                            <p className={Budget.includes(options.id) ? "text-black" : null}>{options.desc}</p>
                        </button>
                    ))}
                </div>  
                <div className="flex justify-end mt-5">
                    <button className="bg-green-400 p-3 rounded-2xl text-white cursor-pointer">Generate itinerary</button> 
                </div>
           
            </div>
            <div className="col-span-1 text-sm flex flex-col items-center border border-gray-100 p-4 rounded-xl">
                <h2 className="font-semibold text-green-600">Tips for Baguio</h2>
                <ul className="list-disc list-inside">
                    <li>Cool climate year-round – pack a light jacket</li>
                    <li>Peak season is March–May. Book early!</li>
                    <li>Traffic gets heavy on weekends – plan around it</li>
                    <li>Try local strawberry taho and ube jam</li>
                </ul>
            </div>
        </div>
    </div>
}