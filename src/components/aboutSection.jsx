import { useEffect, useRef } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const FEATURES = [
    'Discover famous spots and hidden gems across Baguio',
    'Learn the rich history and culture behind each place',
    'Get AI-powered travel tips and itinerary suggestions',
    'Read and share reviews with the traveler community',
]

const STATS = [
    { value: '50+',  label: 'Tourist Spots'   },
    { value: '12k+', label: 'Happy Travelers' },
    { value: '4.9★', label: 'Avg. Rating'     },
]

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

export const AboutSection = () => {
    const headingRef = useReveal()
    const imageRef   = useReveal()
    const textRef    = useReveal()

    return (
        <section className="mt-24 px-6 max-w-7xl mx-auto">

            {/* Heading */}
            <div ref={headingRef} className="fromBottom text-center mb-14">
                <span className="inline-block text-xs font-semibold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-4">
                    About the Platform
                </span>
                <h2 className="font-bold text-4xl text-green-900 leading-tight">
                    Your smarter way to<br className="hidden sm:block" />
                    <span className="text-emerald-600"> explore Baguio</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Left — Image slides in from left */}
                <div ref={imageRef} className="fromLeft relative pb-8">
                    <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-emerald-200 z-0" />
                    <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 rounded-3xl bg-green-50 z-0" />
                    <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl">
                        <img
                            src="/imgs/About.png"
                            alt="About Ask Baguio"
                            className="w-full h-80 lg:h-[420px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent" />
                    </div>

                    {/* Floating stat badges */}
                    <div className="absolute -bottom-2 left-6 right-6 z-20 flex justify-around">
                        {STATS.map((s, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-2xl px-4 py-3 text-center shadow-lg">
                                <p className="font-bold text-green-900 text-lg leading-none">{s.value}</p>
                                <p className="text-gray-400 text-xs mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — Text slides in from right */}
                <div ref={textRef} className="fromRight pt-10 lg:pt-0">
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                        We built this platform to help tourists explore Baguio City with ease. Instead of just listing places to visit, we give you the full picture — history, culture, AI guidance, and a community of fellow travelers to learn from.
                    </p>

                    <ul className="flex flex-col gap-4 mb-10">
                        {FEATURES.map((f, i) => (
                            <li
                                key={i}
                                className="fromRight flex items-start gap-3"
                                style={{ transitionDelay: `${i * 100 + 200}ms` }}
                                ref={el => {
                                    if (!el) return
                                    const obs = new IntersectionObserver(([entry]) => {
                                        if (entry.isIntersecting) { el.classList.add('reveal'); obs.disconnect() }
                                    }, { threshold: 0.1 })
                                    obs.observe(el)
                                }}
                            >
                                <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span className="text-gray-600 text-sm leading-relaxed">{f}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="border-l-4 border-emerald-400 pl-5">
                        <p className="text-green-900 font-semibold text-base italic leading-relaxed">
                            "More than a travel guide — a smarter way to experience the City of Pines."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
