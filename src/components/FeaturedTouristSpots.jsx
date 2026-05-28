import { useEffect, useRef } from 'react'
import { MapPinIcon } from '@heroicons/react/24/solid'

const SPOTS = [
    {
        name: 'Burnham Park',
        category: 'Park',
        rating: 4.8,
        location: 'Harrison Road, Baguio City',
        image: '/imgs/burnham-park.jpg',
        badge: 'Must Visit',
        desc: 'A 32-hectare urban park with a man-made lagoon, rose garden, and bike rentals at the heart of Baguio.',
    },
    {
        name: 'Mines View Park',
        category: 'Viewpoint',
        rating: 4.7,
        location: 'Outlook Drive, Baguio City',
        image: '/imgs/mines-view-park.jpg',
        badge: 'Scenic',
        desc: 'Panoramic views of the Cordillera mountains and the abandoned gold mines of Itogon.',
    },
    {
        name: 'Baguio Botanical Garden',
        category: 'Nature',
        rating: 4.9,
        location: 'Loakan Road, Baguio City',
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/4a/00/23/caption.jpg?w=1200&h=-1&s=1',
        badge: 'Top Rated',
        desc: 'A pine-forested mountain resort with heritage trails, cafés, and cool mountain air.',
    },
    {
        name: 'Our Lady of Atonement Cathedral',
        category: 'Landmark',
        rating: 4.6,
        location: 'Leonard Wood Road, Baguio City',
        image: 'https://baguio.ph/wp-content/uploads/2020/10/Baguio-Cathedral.jpg',
        badge: 'Historic',
        desc: 'Pink cathedral in Baguio offering peaceful views and prayer.',
    },
    {
        name: 'Baguio Night Market',
        category: 'Market',
        rating: 4.6,
        location: 'Harrison Rd, Baguio, Benguet',
        image: 'https://baguio.ph/wp-content/uploads/2020/10/Remembering-Baguio-Night-Market.jpg',
        badge: 'Iconic',
        desc: 'The Baguio Night Market is a lively street market offering affordable clothes, food, and local goods every evening along Harrison Road.',
    },
]

function useReveal(threshold = 0.12) {
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { el.classList.add('reveal'); obs.disconnect() }
        }, { threshold })
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return ref
}

function HeroCard({ name, category, location, image, badge, desc }) {
    const ref = useReveal()

    return (
        <div ref={ref} className="fromLeft relative rounded-3xl overflow-hidden h-[420px] lg:h-full group shadow-md">
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Badge only */}
            <div className="absolute top-4 left-4">
                <span className="bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {badge}
                </span>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">{category}</span>
                <h3 className="text-white font-bold text-2xl mt-1 mb-2 leading-tight">{name}</h3>
                <p className="text-white/65 text-sm leading-relaxed mb-4 line-clamp-2">{desc}</p>
                <div className="flex items-center gap-1.5">
                    <MapPinIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-white/60 text-xs">{location}</span>
                </div>
            </div>
        </div>
    )
}

function SideCard({ name, category, location, image, badge, index }) {
    const ref = useReveal()
    const delays = ['delay-100', 'delay-200', 'delay-300']

    return (
        <div
            ref={ref}
            className={`fromRight ${delays[index]} group relative rounded-2xl overflow-hidden h-[118px] shadow-sm`}
        >
            <img
                src={image}
                alt={name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            <div className="absolute inset-0 flex items-center px-5">
                <div className="min-w-0">
                    <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">{category}</span>
                    <h3 className="text-white font-bold text-sm leading-tight mt-0.5 mb-1.5">{name}</h3>
                    <div className="flex items-center gap-1">
                        <MapPinIcon className="w-3 h-3 text-white/50 shrink-0" />
                        <span className="text-white/50 text-xs truncate">{location}</span>
                    </div>
                </div>
            </div>
        </div>
    )   
}

export const FeaturedSpots = () => {
    const headingRef = useReveal()

    return (
        <section className="mt-24 px-6 max-w-7xl mx-auto">

            {/* Header */}
            <div ref={headingRef} className="fromBottom flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                    <span className="inline-block text-xs font-semibold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-3">
                        Tourist Spots
                    </span>
                    <h2 className="font-bold text-4xl text-green-900 leading-tight">
                        Discover Baguio's<br className="hidden sm:block" /> Best Places
                    </h2>
                </div>
                <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
                    Hand-picked destinations loved by travelers visiting the City of Pines.
                </p>
            </div>

            {/* Hero left + stack right */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5 items-stretch">
                <HeroCard {...SPOTS[0]} />
                <div className="flex flex-col gap-4">
                    {SPOTS.slice(1).map((spot, i) => (
                        <SideCard key={spot.name} {...spot} index={i} />
                    ))}
                </div>
            </div>

        </section>
    )
}
