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

function SpotCard({ name, category, rating, location, image, index }) {
    const [saved, setSaved] = useState(false)

    return (
        <div
            className="group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden
                        hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-w-0 fds-card"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 bg-white/90 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm
                                 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {category}
                </span>
                <button
                    onClick={() => setSaved(p => !p)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center
                               transition-all duration-200 hover:scale-110 active:scale-95"
                >
                    {saved
                        ? <HeartIcon className="w-4 h-4 text-rose-500 fds-heart-pop" />
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
            <style>{`
                @keyframes fdsContainerIn {
                    from { opacity: 0; transform: translateY(18px) scale(0.98); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes fdsHeadingIn {
                    from { opacity: 0; transform: translateX(-14px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes fdsSubIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @keyframes fdsCardIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.96); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes heartPop {
                    0%   { transform: scale(1); }
                    40%  { transform: scale(1.4); }
                    70%  { transform: scale(0.88); }
                    100% { transform: scale(1); }
                }
                .fds-container {
                    animation: fdsContainerIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
                }
                .fds-heading {
                    animation: fdsHeadingIn 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.15s both;
                }
                .fds-sub {
                    animation: fdsSubIn 0.4s ease 0.28s both;
                }
                .fds-seeall {
                    animation: fdsSubIn 0.4s ease 0.3s both;
                }
                .fds-card {
                    animation: fdsCardIn 0.45s cubic-bezier(0.4, 0, 0.2, 1) both;
                }
                .fds-heart-pop {
                    animation: heartPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }
            `}</style>

            <div className="fds-container bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <h2 className="fds-heading font-bold text-gray-800 text-lg">Featured Tourist Spots</h2>
                        <p className="fds-sub text-gray-400 text-sm mt-0.5">Hand-picked places loved by travelers this week</p>
                    </div>
                    <button
                        onClick={() => navigate('/explore')}
                        className="fds-seeall flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-900 transition-colors shrink-0 mt-1
                                   hover:gap-2 transition-all duration-200"
                    >
                        See all →
                    </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {SPOTS.map((spot, i) => <SpotCard key={spot.name} {...spot} index={i} />)}
                </div>
            </div>
        </div>
    )
}
