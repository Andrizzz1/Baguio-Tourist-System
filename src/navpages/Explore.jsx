import { useState } from "react"
import { DashboardNav } from "../dashboard/DashboardNav"
import { MapPinIcon, StarIcon, SparklesIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

const topPlaces = [
    {
        name: "Burnham Park",
        image: "/imgs/botanical-garden.jpg",
        rating: 4.8,
        location: "Harrison Road, Baguio City, Philippines.",
        badge: "Iconic",
        badgeColor: "bg-emerald-600",
        hours: "Open 24 hours",
        entry: "Free entry",
        about: "American architect Daniel Hudson Burnham created Burnham Park, a 32.84-hectare urban haven in the center of Baguio City, Philippines, in 1904. With a man-made lagoon, rose garden, and kids' playground, it acts as a major leisure center for walking, biking, and boating. It is usually open around-the-clock and requires no admission.",
        highlights: ["Boating lagoon", "Rose Garden", "Skating rink", "Bike rentals"],
    },
    {
        name: "Mines View Park",
        image: "/imgs/mines-view-park.jpg",
        rating: 4.6,
        location: "Outlook Drive, Baguio City, Philippines.",
        badge: "Scenic",
        badgeColor: "bg-blue-500",
        hours: "6:00 AM – 7:00 PM",
        entry: "Free entry",
        about: "Mines View Park is a renowned observation deck in the northeastern limits of Baguio City, Philippines, that provides breathtaking panoramic views of the Cordillera Mountains and the abandoned gold and copper mines of Itogon. It is a popular tourist destination, known for its viewing deck, traditional cultural costumes, and gift shops.",
        highlights: ["Mountain overlook", "Souvenir shops", "Photo spots", "Indigenous crafts"],
    },
    {
        name: "Camp John Hay",
        image: "/imgs/camp-john-hay.jpg",
        rating: 4.7,
        location: "Loakan Road, Baguio City, Philippines.",
        badge: "Nature",
        badgeColor: "bg-green-600",
        hours: "Open 24 hours",
        entry: "Free entry",
        about: "Camp John Hay is one of the most popular tourist attractions in Baguio City. During the early 1900s, it served as an American military rest and recreation base before evolving into a mountain resort and eco-tourism destination. Today, it is noted for its pine trees, cold weather, tranquil ambiance, and historical sites.",
        highlights: ["Pine forests", "Golf course", "Heritage trails", "Restaurants"],
    },
    {
        name: "BenCab Museum",
        image: "/imgs/bencab-museum.jpg",
        rating: 4.9,
        location: "Km. 6 Asin Road, Tadiangan, Tuba, Benguet, Philippines.",
        badge: "Art",
        badgeColor: "bg-purple-600",
        hours: "9:00 AM – 6:00 PM",
        entry: "₱200 adults",
        about: "The BenCab Museum is a prominent art and cultural destination near Baguio City. Founded by National Artist Benedicto Cabrera, it showcases Filipino artworks, Cordilleran antiquities, lovely gardens, and breathtaking mountain views. Visitors love the tranquil atmosphere, eco-trails, and relaxing experience in nature.",
        highlights: ["Contemporary art", "Indigenous artifacts", "Hillside café", "Garden trail"],
    },
]

const otherPlaces = [
    {
        name: "Tam-awan Village",
        location: "Pinsao Proper",
        rating: 4.5,
        badge: "Hidden Gem",
        badgeColor: "bg-amber-100 text-amber-700",
        hours: "9:00 AM – 6:00 PM",
        entry: "₱50 entry",
        description: "A reconstructed Cordillera village with authentic Ifugao and Kalinga huts. Catch live indigenous dance performances...",
        about: "A reconstructed Cordillera village featuring authentic Ifugao and Kalinga huts perched on a hillside with panoramic views of Baguio. Catch live indigenous dance performances and local artisan workshops.",
        highlights: ["Cultural shows", "Kalinga huts", "Art workshops", "City views"],
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    },
    {
        name: "Wright Park",
        location: "Leonard Wood Road",
        rating: 4.4,
        badge: "Family Friendly",
        badgeColor: "bg-green-100 text-green-700",
        hours: "Open 24 hours",
        entry: "Free entry",
        description: "Famous for its 'Pool of Pines' reflecting pond and horseback riding circle. A short stroll from The Mansion...",
        about: "Famous for its iconic 'Pool of Pines' reflecting pond lined with tall pine trees and a horseback riding circle. A short, scenic stroll from The Mansion and Lourdes Grotto.",
        highlights: ["Horseback riding", "Pool of Pines", "Pine tree walk", "Photo spots"],
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    },
    {
        name: "Diplomat Hotel Ruins",
        location: "Dominican Hill",
        rating: 4.2,
        badge: "Hidden Gem",
        badgeColor: "bg-amber-100 text-amber-700",
        hours: "8:00 AM – 5:00 PM",
        entry: "Free entry",
        description: "An abandoned hilltop retreat house with a haunting WWII history. Worth visiting for the sweeping views of Baguio...",
        about: "An abandoned hilltop retreat house turned WWII refuge with eerie ruins and a rich, haunting history. The rooftop offers some of the most sweeping panoramic views of Baguio City.",
        highlights: ["WWII history", "Panoramic views", "Photography", "Ruins tour"],
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    },
    {
        name: "The Mansion",
        location: "Leonard Wood Road",
        rating: 4.3,
        badge: "Historic",
        badgeColor: "bg-stone-100 text-stone-700",
        hours: "8:00 AM – 6:00 PM",
        entry: "Free entry",
        description: "The official summer residence of the Philippine president. Iconic white iron gates and manicured gardens...",
        about: "The official summer residence of the President of the Philippines. Visitors enjoy the iconic ornate white iron gates and manicured gardens without entering the main house.",
        highlights: ["Historic gates", "Manicured gardens", "Presidential residence", "Photo spots"],
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
    },
    {
        name: "Botanical Garden",
        location: "Leonard Wood Road",
        rating: 4.1,
        badge: "Nature",
        badgeColor: "bg-green-100 text-green-700",
        hours: "7:00 AM – 7:00 PM",
        entry: "Free entry",
        description: "A free public garden showcasing the flora and indigenous culture of the Cordillera region...",
        about: "A free public garden nestled within Baguio, showcasing the diverse flora of the Cordillera region alongside displays of indigenous cultural attire and life-size ethnic village dioramas.",
        highlights: ["Native flora", "Ethnic village", "Free admission", "Family-friendly"],
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop",
    },
    {
        name: "Good Shepherd Convent",
        location: "Upper General Luna Road",
        rating: 4.4,
        badge: "Local Favorite",
        badgeColor: "bg-rose-100 text-rose-700",
        hours: "7:00 AM – 5:00 PM",
        entry: "Free entry",
        description: "Famous for its ube jam and strawberry products made by nuns. A must-stop for pasalubong...",
        about: "Run by the Good Shepherd Sisters, this convent is Baguio's most beloved pasalubong stop. Their handcrafted ube jam, peanut brittle, and strawberry preserves are iconic Baguio souvenirs.",
        highlights: ["Ube jam", "Peanut brittle", "Strawberry preserves", "Pasalubong"],
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    },
]

const PlaceModal = ({ place, onClose }) => {
    if (!place) return null
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* IMAGE */}
                <div className="relative">
                    <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full p-1.5 transition"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-1.5 text-white/80 text-sm mb-1">
                            <MapPinIcon className="w-4 h-4" />
                            {place.location}
                        </div>
                        <h2 className="text-2xl font-bold text-white">{place.name}</h2>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-semibold">
                        <StarIcon className="w-4 h-4 text-yellow-300" />
                        {place.rating}
                    </div>
                </div>

                {/* BODY */}
                <div className="p-6">
                    {/* INFO PILLS */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {[
                            { label: "CATEGORY", value: place.badge },
                            { label: "HOURS", value: place.hours, icon: <ClockIcon className="w-3.5 h-3.5 inline mr-1 text-gray-400" /> },
                            { label: "ENTRY", value: place.entry },
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-3">
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                    {item.label}
                                </p>
                                <p className="text-sm font-medium text-gray-800">
                                    {item.icon}{item.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* ABOUT */}
                    <h3 className="font-bold text-gray-900 mb-2">About this place</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{place.about}</p>

                    {/* HIGHLIGHTS */}
                    <h3 className="font-bold text-gray-900 mb-3">Highlights</h3>
                    <div className="flex flex-wrap flex-row gap-2 mb-6">
                        {place.highlights.map((h, i) => (
                            <span key={i} className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full border border-green-100">
                                {h}
                            </span>
                        ))}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3">
                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-2xl transition text-sm">
                            Add to itinerary
                        </button>
                        <button className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold py-3 rounded-2xl transition text-sm">
                            Ask AI Guide
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Explore = () => {
    const [selected, setSelected] = useState(null)

    return (
        <section className="min-h-screen bg-white">
            <DashboardNav />

            <PlaceModal place={selected} onClose={() => setSelected(null)} />

            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">
                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to dashboard
                    </button>
                    <span className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-1.5 rounded-full font-medium">
                        <SparklesIcon className="w-4 h-4" />
                        12 places
                    </span>
                </div>

                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Explore Baguio</h1>
                    <p className="text-gray-500 mt-1">Discover top destinations and hidden gems around the City of Pines.</p>
                </div>

                {/* TOP PLACES */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Top Places</h2>
                    <p className="text-sm text-gray-400 mb-5">The must-visit landmarks of Baguio</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {topPlaces.map((place, i) => (
                            <div
                                key={i}
                                onClick={() => setSelected(place)}
                                className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer group"
                            >
                                <div className="relative">
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <span className={`absolute top-3 left-3 ${place.badgeColor} text-white text-xs font-semibold px-2.5 py-1 rounded-lg`}>
                                        {place.badge}
                                    </span>
                                </div>
                                <div className="p-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900 text-sm">{place.name}</h3>
                                        <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                                            <StarIcon className="w-3.5 h-3.5" />
                                            {place.rating}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                                        <MapPinIcon className="w-3.5 h-3.5" />
                                        {place.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* OTHER PLACES */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Other Places to Discover</h2>
                    <p className="text-sm text-gray-400 mb-5">Local favorites, hidden gems, and off-the-beaten-path finds</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {otherPlaces.map((place, i) => (
                            <div
                                key={i}
                                onClick={() => setSelected(place)}
                                className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
                            >

                                {/* IMAGE */}
                                <div className="relative">
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                                    />

                                    <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${place.badgeColor}`}>
                                        {place.badge}
                                    </span>
                                </div>

                                {/* CONTENT */}
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-gray-900 text-base">{place.name}</h3>
                                        <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                                            <StarIcon className="w-3.5 h-3.5" />
                                            {place.rating}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 mb-2 text-gray-400 text-xs">
                                        <MapPinIcon className="w-3.5 h-3.5" />
                                        {place.location}
                                    </div>

                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                        {place.description}
                                    </p>

                                    <button className="mt-3 text-green-600 hover:text-green-700 font-semibold text-sm transition">
                                        View details →
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