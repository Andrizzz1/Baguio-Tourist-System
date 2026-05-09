import { useState } from 'react'
import { HeartIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const SPOTS = [
    {
        name: 'Burnham Park',
        category: 'Park',
        rating: 4.8,
        location: 'Baguio City',
        image: '/imgs/burnham-park.jpg',
    },
    {
        name: 'Mines View Park',
        category: 'Viewpoint',
        rating: 4.7,
        location: 'Baguio City',
        image: '/imgs/mines-view-park.jpg',
    },
    {
        name: 'Camp John Hay',
        category: 'Nature',
        rating: 4.9,
        location: 'Baguio City',
        image: '/imgs/camp-john-hay.jpg',
    },
    {
        name: 'The Mansion',
        category: 'Landmark',
        rating: 4.6,
        location: 'Baguio City',
        image: '/imgs/the-mansion.jpg',
    },
]

function SpotCard({ name, category, rating, location, image }) {
    const [saved, setSaved] = useState(false)

    return (
        <div className="group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden
                        hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-w-0">
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-white/90 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    {category}
                </span>
                <button
                    onClick={() => setSaved(p => !p)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center hover:scale-110 transition-transform duration-200"
                >
                    {saved
                        ? <HeartIcon className="w-4 h-4 text-rose-500" />
                        : <HeartOutline className="w-4 h-4 text-gray-400" />
                    }
                </button>
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col gap-1.5">
                <h3 className="font-semibold text-gray-800 text-sm leading-tight">{name}</h3>
                <div className="flex items-center gap-1">
                    <StarIcon className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-600">{rating}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MapPinIcon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="text-xs text-gray-400 truncate">{location}</span>
                </div>
            </div>
        </div>
    )
}

export const FeaturedDashboardSpots = () => {
    const navigate = useNavigate()

    return (
        <div className="px-5 mx-auto max-w-7xl mt-5">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <h2 className="font-bold text-gray-800 text-lg">Featured Tourist Spots</h2>
                        <p className="text-gray-400 text-sm mt-0.5">Hand-picked places loved by travelers this week</p>
                    </div>
                    <button
                        onClick={() => navigate('/explore')}
                        className="flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-900 transition-colors shrink-0 mt-1"
                    >
                        See all →
                    </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {SPOTS.map(spot => <SpotCard key={spot.name} {...spot} />)}
                </div>
            </div>
        </div>
    )
}
