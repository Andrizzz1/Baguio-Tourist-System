import { DashboardNav } from "../dashboard/DashboardNav"
import { BookmarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from "react"
export const Saved = ()=>{
    const [selected, setSelected] = useState('all')
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
    </section>
}