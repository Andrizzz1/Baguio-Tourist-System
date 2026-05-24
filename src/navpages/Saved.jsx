import { DashboardNav } from "../dashboard/DashboardNav"
import { BookmarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from "react"
export const Saved = ()=>{
    const [selected, setSelected] = useState('all')
    const [saveData,setSaveData] = useState([])
    const [allData, setAllData] = useState([])
    const [savedSpots, setSavedSpots] = useState([]);

    const fetchSaved = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id || user?.users_id;

        if (!userId) {
            console.log("No user ID found");
            return;
        }

        try {
            const res = await fetch(`/api/saved-spots?userId=${userId}`);
            const data = await res.json();

            if (res.ok && Array.isArray(data)) {
                setSavedSpots(data);
            } else {
                console.log(data.error || "Invalid saved spots data");
                setSavedSpots([]);
            }
        } catch (err) {
            console.log("Fetch saved spots error:", err);
            setSavedSpots([]);
        }
    };

    useEffect(() => {
        fetchSaved();
    }, []);

    return <section>
        <DashboardNav/>
        <div className="flex justify-center m-5">
            <div className="nc-card relative overflow-hidden p-10 rounded-3xl h-auto bg-cover items-center bg-center text-white w-7xl"
                style={{ backgroundImage: `linear-gradient(120deg, rgba(4, 120, 87, 0.92), rgba(6, 95, 70, 0.72)),url('/imgs/bg.png')` }}>
               <div className="flex items-center gap-1">
                <BookmarkIcon className="w-5" />
                <p className="text-sm">Your collection</p>
               </div>
               
                <h1 className=" text-4xl font-semibold text-emerald-50 ">Saved places & itineraries</h1> 
                <p className="nc-subtitle max-w-xl text-emerald-100">Everything you've bookmarked across Baguio — spots to revisit, food to try, and trips to plan.</p>           
            </div>
        </div>

        {/*mini navbar */}
        <div className="flex justify-center">


        <div className="flex justify-between w-7xl mx-5 bg-gray-100 rounded-2xl p-2">
            <div >
                <ul className="flex flex-wrap gap-5 text-md items-center ">
                    <li onClick={()=>{setSelected("all")}} className={`cursor-pointer transition-all 1s ${selected==="all"?"bg-white p-1 rounded-full shadow-2xl":"text-gray-400"}`}>All</li>
                    <li onClick={()=>{setSelected("saved")}}  className={`cursor-pointer transition-all 1s ${selected==="saved"?"bg-white p-1 rounded-full shadow-2xl":"text-gray-400"}`}>Saved Spots</li>
                    <li onClick={()=>{setSelected("itenerary")}}  className={`cursor-pointer transition-all 1s ${selected==="itenerary"?"bg-white p-1 rounded-full shadow-2xl":"text-gray-400"}`}>Itineraries</li>
                </ul>
            </div>

            <div className="flex items-center">
                <MagnifyingGlassIcon className="w-5 h-6" />
                <input type="text" className="outline-0" placeholder="Search saved..." />
            </div>
        </div>
        </div>

     
        <div className="flex flex-wrap justify-around mt-10 lg:mx-20">
            {(savedSpots.length > 0 && selected === "saved")?(
                savedSpots.map((spot) => (
                    <div className="flex flex-col w-64" key={spot.saved_id}>
                        <img className="rounded-2xl h-44" src={spot.spot_image} alt={spot.spot_name} />
                        <h3>{spot.spot_name}</h3>
                        <p>{spot.spot_location}</p>
                    </div>
                ))
            ) : (
                <p>No saved spots yet.</p>
            )}
        </div>
    </section>
}