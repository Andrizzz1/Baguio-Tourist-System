import { useState } from 'react'
import { HeartIcon, MapPinIcon, StarIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
    {
        id: 'parks',
        label: 'Famous Parks & Nature Spots',
        emoji: '🌿',
        accentColor: '#16a34a',
        accentBg: '#f0fdf4',
        accentBorder: '#bbf7d0',
        spots: [
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
        ],
    },
    {
        id: 'museums',
        label: 'Museums, Arts & Culture',
        emoji: '🏛️',
        accentColor: '#7c3aed',
        accentBg: '#faf5ff',
        accentBorder: '#ddd6fe',
        spots: [
            {
                name: 'Baguio Museum',
                category: 'Museum',
                rating: 4.6,
                location: 'Baguio City',
                image: '/imgs/baguio-museum.jpg',
            },
            {
                name: 'The Mansion',
                category: 'Landmark',
                rating: 4.6,
                location: 'Baguio City',
                image: '/imgs/the-mansion.jpg',
            },
            {
                name: 'Bell Church',
                category: 'Heritage',
                rating: 4.5,
                location: 'Baguio City',
                image: '/imgs/bell-church.jpg',
            },
        ],
    },
    {
        id: 'family',
        label: 'Family & Fun Attractions',
        emoji: '🎡',
        accentColor: '#ea580c',
        accentBg: '#fff7ed',
        accentBorder: '#fed7aa',
        spots: [
            {
                name: 'Igorot Stone Kingdom',
                category: 'Attraction',
                rating: 4.5,
                location: 'Baguio City',
                image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/e6/3c/c7/caption.jpg?w=1200&h=-1&s=1',
            },
            {
                name: 'Strawberry Farm',
                category: 'Farm',
                rating: 4.8,
                location: 'La Trinidad',
                image: '/imgs/strawberry-farm.jpg',
            },
            {
                name: 'Botanical Garden',
                category: 'Nature',
                rating: 4.4,
                location: 'Baguio City',
                image: '/imgs/botanical-garden.jpg',
            },
        ],
    },
    {
        id: 'food',
        label: 'Food & Market Areas',
        emoji: '🍽️',
        accentColor: '#b45309',
        accentBg: '#fffbeb',
        accentBorder: '#fde68a',
        spots: [
            {
                name: 'Baguio Night Market',
                category: 'Market',
                rating: 4.7,
                location: 'Harrison Road',
                image: '/imgs/night-market.jpg',
            },
            {
                name: 'Good Shepherd Convent',
                category: 'Food Shop',
                rating: 4.9,
                location: 'Baguio City',
                image: '/imgs/good-shepherd.jpg',
            },
            {
                name: 'Good Taste Restaurant',
                category: 'Restaurant',
                rating: 4.8,
                location: 'Baguio City',
                image: '/imgs/good-taste.jpg',
            },
        ],
    },
]

function SpotCard({ name, category, rating, location, image, index, accentColor, accentBg }) {
    const [saved, setSaved] = useState(false)

    return (
        <div
            className="group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden
                        hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 min-w-0 fds-card"
            style={{ animationDelay: `${index * 0.08}s` }}
        >
            {/* Image */}
            <div className="relative h-40 overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    onError={e => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                    }}
                />
                {/* Fallback placeholder */}
                <div
                    className="absolute inset-0 items-center justify-center text-4xl hidden"
                    style={{ background: accentBg, display: 'none' }}
                >
                    <span>📍</span>
                </div>

                <span
                    className="absolute top-2 left-2 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm
                                 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    style={{ background: accentBg, color: accentColor, border: `1px solid ${accentColor}22` }}
                >
                    {category}
                </span>
                <button
                    onClick={() => setSaved(p => !p)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 shadow-sm flex items-center justify-center
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
                <h3 className="font-semibold text-gray-800 text-sm leading-tight truncate">{name}</h3>
                <div className="flex items-center gap-1">
                    <StarIcon className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                    <span className="text-xs font-bold" style={{ color: accentColor }}>{rating}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MapPinIcon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="text-xs text-gray-400 truncate">{location}</span>
                </div>
            </div>
        </div>
    )
}

function CategorySection({ id, label, emoji, accentColor, accentBg, accentBorder, spots, sectionIndex, navigate }) {
    return (
        <div
            className="fds-section rounded-2xl border p-5"
            style={{
                background: accentBg,
                borderColor: accentBorder,
                animationDelay: `${sectionIndex * 0.12}s`,
            }}
        >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    <span className="text-xl leading-none">{emoji}</span>
                    <h3
                        className="font-bold text-base leading-tight"
                        style={{ color: accentColor }}
                    >
                        {label}
                    </h3>
                </div>
                <button
                    onClick={() => navigate(`/explore?category=${id}`)}
                    className="flex items-center gap-1 text-xs font-semibold transition-all duration-200 hover:gap-2 shrink-0"
                    style={{ color: accentColor }}
                >
                    See all
                    <ArrowRightIcon className="w-3 h-3" />
                </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {spots.map((spot, i) => (
                    <SpotCard
                        key={spot.name}
                        {...spot}
                        index={i + sectionIndex * 3}
                        accentColor={accentColor}
                        accentBg={accentBg}
                    />
                ))}
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
                @keyframes fdsSectionIn {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
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
                    animation: fdsHeadingIn 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.12s both;
                }
                .fds-sub {
                    animation: fdsSubIn 0.4s ease 0.22s both;
                }
                .fds-seeall {
                    animation: fdsSubIn 0.4s ease 0.24s both;
                }
                .fds-section {
                    animation: fdsSectionIn 0.45s cubic-bezier(0.4, 0, 0.2, 1) both;
                }
                .fds-card {
                    animation: fdsCardIn 0.45s cubic-bezier(0.4, 0, 0.2, 1) both;
                }
                .fds-heart-pop {
                    animation: heartPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }
                .group-hover\:scale-108:hover img {
                    transform: scale(1.08);
                }
            `}</style>

            <div className="fds-container bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6">

                {/* Top Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="fds-heading font-bold text-gray-800 text-lg">Featured Tourist Spots</h2>
                        <p className="fds-sub text-gray-400 text-sm mt-0.5">Hand-picked places loved by travelers this week</p>
                    </div>
                    <button
                        onClick={() => navigate('/explore')}
                        className="fds-seeall flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-900
                                   hover:gap-2 transition-all duration-200 shrink-0 mt-1"
                    >
                        Explore all →
                    </button>
                </div>

                {/* Category Sections */}
                {CATEGORIES.map((cat, i) => (
                    <CategorySection
                        key={cat.id}
                        {...cat}
                        sectionIndex={i}
                        navigate={navigate}
                    />
                ))}
            </div>
        </div>
    )
}
