import { BookmarkIcon, MapPinIcon, MapIcon } from '@heroicons/react/24/outline'

const actions = [
    {
        icon: <BookmarkIcon className="w-6 h-6 text-green-700" />,
        name: 'Saved Spots',
        desc: 'View and manage your favorite Baguio destinations.',
        bg: 'bg-green-100',
    },
    {
        icon: <MapIcon className="w-6 h-6 text-emerald-700" />,
        name: 'Plan a Trip',
        desc: 'Build a Baguio itinerary based on your saved places.',
        bg: 'bg-emerald-100',
    },
    {
        icon: <MapPinIcon className="w-6 h-6 text-teal-700" />,
        name: 'Explore Places',
        desc: 'Discover landmarks, trails, and local attractions.',
        bg: 'bg-teal-100',
    },
]

function ActionCard({ icon, name, desc, bg, index }) {
    return (
        <div
            className="group bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3 shadow-sm
                        hover:shadow-md hover:-translate-y-1 hover:border-green-200
                        transition-all duration-300 cursor-pointer qa-card"
            style={{ animationDelay: `${index * 0.12}s` }}
        >
            <div className={`${bg} w-11 h-11 rounded-xl flex items-center justify-center
                            group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <div>
                <h3 className="font-semibold text-gray-800 text-sm">{name}</h3>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">{desc}</p>
            </div>
            <span className="text-xs text-green-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Open →
            </span>
        </div>
    )
}

export const QuickAction = () => {
    return (
        <div className="px-5 max-w-7xl mx-auto mt-5">
            <style>{`
                @keyframes qaCardIn {
                    from { opacity: 0; transform: translateY(16px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes qaHeadingIn {
                    from { opacity: 0; transform: translateX(-12px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes qaSubIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                .qa-card {
                    animation: qaCardIn 0.45s cubic-bezier(0.4, 0, 0.2, 1) both;
                }
                .qa-heading {
                    animation: qaHeadingIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
                }
                .qa-sub {
                    animation: qaSubIn 0.4s ease 0.15s both;
                }
            `}</style>

            <div className="mb-4">
                <h2 className="qa-heading text-gray-800 font-bold text-lg">Quick Actions</h2>
                <p className="qa-sub text-gray-400 text-sm">Everything you need for your Baguio trip</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {actions.map((a, i) => <ActionCard key={a.name} {...a} index={i} />)}
            </div>
        </div>
    )
}
