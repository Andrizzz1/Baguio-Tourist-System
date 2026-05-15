import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRightIcon, UserGroupIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/solid'

const STATS = [
    { icon: <UserGroupIcon className="w-4 h-4 text-emerald-500" />, value: '12k+', label: 'Travelers' },
    { icon: <MapPinIcon className="w-4 h-4 text-emerald-500" />,    value: '50+',  label: 'Spots'     },
    { icon: <StarIcon className="w-4 h-4 text-emerald-500" />,      value: '4.9',  label: 'Rating'    },
]

const TAGS = ['🌲 Pine Trails', '🗺️ AI Tips', '🍓 Local Eats', '📸 Photo Spots']

function useReveal(threshold = 0.15) {
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

export const CalltoAction = () => {
    const navigate   = useNavigate()
    const leftRef    = useReveal()
    const rightRef   = useReveal()

    return (
        <section className="mt-24 px-4 sm:px-6 max-w-7xl mx-auto pb-10">
            <div className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-gray-100 shadow-sm">

                {/* Left — slides in from left */}
                <div ref={leftRef} className="fromLeft bg-green-50 flex flex-col justify-center px-10 py-14 lg:px-14">
                    <span className="inline-block text-xs font-semibold text-emerald-600 uppercase tracking-widest bg-white border border-emerald-100 px-3 py-1 rounded-full mb-5 w-fit">
                        Get Started Today
                    </span>

                    <h2 className="font-bold text-4xl text-green-900 leading-tight mb-4">
                        Ready to Explore<br />
                        <span className="text-emerald-600">Baguio City?</span>
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-sm">
                        Join thousands of travelers who have discovered the best of Baguio with our AI-powered guide. Your next adventure starts here.
                    </p>

                    {/* Stats — staggered fromBottom */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        {STATS.map((s, i) => (
                            <div
                                key={i}
                                className="fromBottom flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm"
                                style={{ transitionDelay: `${i * 100 + 200}ms` }}
                                ref={el => {
                                    if (!el) return
                                    const obs = new IntersectionObserver(([entry]) => {
                                        if (entry.isIntersecting) { el.classList.add('reveal'); obs.disconnect() }
                                    }, { threshold: 0.1 })
                                    obs.observe(el)
                                }}
                            >
                                {s.icon}
                                <div>
                                    <p className="font-bold text-green-900 text-sm leading-none">{s.value}</p>
                                    <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => navigate('/Register')}
                            className="flex items-center gap-2 bg-green-900 hover:bg-green-700 text-white font-semibold px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-sm"
                        >
                            Start Your Journey
                            <ArrowRightIcon className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => navigate('/Signin')}
                            className="flex items-center gap-2 bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 text-green-900 font-semibold px-7 py-3 rounded-full transition-all duration-300 text-sm"
                        >
                            Sign In
                        </button>
                    </div>
                </div>

                {/* Right — slides in from right */}
                <div
                    ref={rightRef}
                    className="fromRight relative min-h-72 lg:min-h-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/imgs/background.png')" }}
                >
                    <div className="absolute inset-0 bg-green-900/65" />
                    <div className="absolute inset-0 flex flex-col justify-end p-10 z-10">
                        <p className="text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-3">City of Pines</p>
                        <h3 className="text-white font-bold text-3xl leading-tight mb-4">
                            Your journey<br />awaits you
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {TAGS.map((tag, i) => (
                                <span
                                    key={tag}
                                    className="fromBottom bg-white/10 border border-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full"
                                    style={{ transitionDelay: `${i * 80 + 300}ms` }}
                                    ref={el => {
                                        if (!el) return
                                        const obs = new IntersectionObserver(([entry]) => {
                                            if (entry.isIntersecting) { el.classList.add('reveal'); obs.disconnect() }
                                        }, { threshold: 0.1 })
                                        obs.observe(el)
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
