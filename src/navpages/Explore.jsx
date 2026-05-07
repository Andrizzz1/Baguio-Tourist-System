import { DashboardNav } from "../dashboard/DashboardNav"
import {
    MagnifyingGlassIcon,
    MapPinIcon,
    StarIcon,
    FireIcon,
    CameraIcon,
} from "@heroicons/react/24/solid"

export const Explore = () => {

    const places = [
        {
            name: "Burnham Park",
            images: "'/imgs/Andrei.png",
            rating: "4.9",
            location: "Baguio City",
        },
        {
            name: "Mines View",
            images: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
            rating: "4.8",
            location: "Outlook Drive",
        },
        {
            name: "Camp John Hay",
            imgs: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1200&auto=format&fit=crop",
            rating: "4.7",
            location: "Loakan Road",
        },
    ]

    return (
        <section className="min-h-screen bg-[#f5f7fb]">
            
            <DashboardNav />

            {/* HERO */}
            <div className="px-6 pt-8">

                <div className="bg-gradient-to-r from-green-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                    
                    <div className="absolute top-0 right-0 w-52 h-52 bg-imgs/10 rounded-full blur-2xl"></div>

                    <p className="uppercase tracking-[4px] text-sm opacity-80">
                        Explore Baguio
                    </p>

                    <h1 className="text-4xl font-bold mt-3 leading-tight">
                        Discover Beautiful <br /> Tourist Spots
                    </h1>

                    <p className="mt-4 text-white/80 max-w-lg">
                        Find amazing places, hidden gems, and top attractions
                        around the city.
                    </p>

                    {/* SEARCH */}
                    <div className="bg-white mt-8 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
                        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />

                        <input
                            type="text"
                            placeholder="Search destinations..."
                            className="bg-transparent outline-none w-full text-black"
                        />
                    </div>
                </div>

                {/* CATEGORY */}
                <div className="mt-8 flex gap-4 overflow-x-auto pb-2">

                    <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-2xl shadow-md whitespace-nowrap">
                        <FireIcon className="w-5 h-5" />
                        Popular
                    </button>

                    <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-md whitespace-nowrap">
                        <CameraIcon className="w-5 h-5 text-blue-500" />
                        Photography
                    </button>

                    <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-md whitespace-nowrap">
                        <MapPinIcon className="w-5 h-5 text-red-500" />
                        Nature
                    </button>
                </div>

                {/* TRENDING */}
                <div className="mt-10">

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Trending Places
                        </h2>

                        <button className="text-blue-600 font-semibold">
                            View All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {places.map((place, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:scale-[1.02] transition-all duration-300"
                            >

                                <div className="relative">
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        className="w-full h-60 object-cover"
                                    />

                                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow">
                                        <StarIcon className="w-4 h-4 text-yellow-400" />
                                        <span className="text-sm font-semibold">
                                            {place.rating}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5">

                                    <h3 className="text-xl font-bold text-gray-800">
                                        {place.name}
                                    </h3>

                                    <div className="flex items-center gap-2 mt-2 text-gray-500">
                                        <MapPinIcon className="w-5 h-5" />
                                        <span>{place.location}</span>
                                    </div>

                                    <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition">
                                        Explore Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}