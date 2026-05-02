import { useState } from 'react'
import { HeartIcon, MapPinIcon, StarIcon, PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'

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

const CHIPS = [
    'Best sunrise spots near the city?',
    'Where to try strawberry taho?',
    '3-day itinerary for first-timers',
]

function SpotCard({ name, category, rating, location, image }) {
    const [saved, setSaved] = useState(false)

    return (
        <div className="group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden
                        hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-w-0">
            {/* Image */}
            <div className="relative h-36 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category badge */}
                <span className="absolute top-2 left-2 bg-white/90 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    {category}
                </span>
                {/* Heart button */}
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

function AskBaguioAI() {
    const [input, setInput] = useState('')
    const [showChips, setShowChips] = useState(true)
    const [messages, setMessages] = useState([
        { from: 'bot', text: "Hi! Want me to plan a cozy weekend around Camp John Hay with cafés and short hikes?" }
    ])

    const send = (text) => {
        const msg = text || input.trim()
        if (!msg) return
        setShowChips(false)
        setMessages(prev => [
            ...prev,
            { from: 'user', text: msg },
            { from: 'bot', text: `Great question about "${msg}"! I'll have detailed Baguio tips for you soon. 🌿` }
        ])
        setInput('')
    }

    return (
        <div className="bg-emerald-50 rounded-3xl border border-emerald-100 shadow-sm flex flex-col h-full p-5 gap-4">

            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center shrink-0">
                    <SparklesIcon className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                    <h3 className="font-bold text-green-900 text-sm">Ask Baguio AI</h3>
                    <p className="text-xs text-emerald-600">Your personal local guide</p>
                </div>
            </div>

            {/* Chat bubbles */}
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto max-h-56">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm
                            ${msg.from === 'user'
                                ? 'bg-green-900 text-white rounded-br-sm'
                                : 'bg-white text-gray-700 rounded-bl-sm border border-gray-100'
                            }`}>
                            {msg.from === 'bot' && <span className="font-semibold text-emerald-600 block mb-0.5">AI</span>}
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Suggestion chips — hidden once user interacts */}
            {showChips && (
                <div className="flex flex-col gap-2">
                    {CHIPS.map(chip => (
                        <button
                            key={chip}
                            onClick={() => send(chip)}
                            className="text-left text-xs bg-white text-green-800 border border-emerald-200 px-3 py-2 rounded-xl
                                       hover:bg-green-900 hover:text-white hover:border-green-900 transition-all duration-200 font-medium shadow-sm"
                        >
                            {chip}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 bg-white border border-emerald-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-green-700 transition-all">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onFocus={() => setShowChips(false)}
                    onKeyDown={e => e.key === 'Enter' && send()}
                    placeholder="Ask about Baguio…"
                    className="flex-1 bg-transparent outline-none text-xs text-gray-700 placeholder-gray-400"
                />
                <button
                    onClick={() => send()}
                    className="w-7 h-7 rounded-full bg-green-900 hover:bg-green-700 flex items-center justify-center shrink-0 transition-colors duration-200"
                >
                    <PaperAirplaneIcon className="w-3.5 h-3.5 text-white" />
                </button>
            </div>
        </div>
    )
}

export const FeaturedDashboardSpots = () => {
    return (
        <div className="px-5 mx-auto max-w-7xl mt-5">
            <div className="flex flex-col lg:flex-row gap-5">

                {/* Left — Featured Spots Card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-5">
                        <div>
                            <h2 className="font-bold text-gray-800 text-lg">Featured Tourist Spots</h2>
                            <p className="text-gray-400 text-sm mt-0.5">Hand-picked places loved by travelers this week</p>
                        </div>
                        <a href="#" className="flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-900 transition-colors shrink-0 mt-1">
                            See all <span>→</span>
                        </a>
                    </div>

                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                        {SPOTS.map(spot => <SpotCard key={spot.name} {...spot} />)}
                    </div>
                </div>

                {/* Right — AI Panel */}
                <div className="w-full lg:w-80 shrink-0">
                    <AskBaguioAI />
                </div>
            </div>
        </div>
    )
}
