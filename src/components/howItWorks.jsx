import { useEffect, useRef } from 'react'
import { MagnifyingGlassIcon, BookOpenIcon} from '@heroicons/react/24/solid'
import { RiRobot2Fill } from 'react-icons/ri'

const STEPS = [
    {
        number: '01',
        icon: <MagnifyingGlassIcon className="w-7 h-7 text-white" />,
        title: 'Discover Places',
        desc: 'Browse tourist spots, hidden gems, and local favorites with rich details, photos, and ratings.',
        anim: 'fromLeft',
        delay: 'delay-100',
    },
    {
        number: '02',
        icon: <BookOpenIcon className="w-7 h-7 text-white" />,
        title: 'Learn the History',
        desc: 'Read detailed background stories, cultural context, and historical facts for every destination.',
        anim: 'fromBottom',
        delay: 'delay-200',
    },
    {
        number: '03',
        icon: <RiRobot2Fill className="w-7 h-7 text-white" />,
        title: 'Ask the AI Guide',
        desc: 'Get instant itinerary suggestions, travel tips, and personalized recommendations from our AI.',
        anim: 'fromRight',
        delay: 'delay-300',
    },
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

function StepCard({ number, icon, title, desc, anim, delay }) {
    const ref = useReveal()
    return (
        <div
            ref={ref}
            className={`${anim} ${delay} relative z-10 group bg-white border border-gray-100 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-5`}
        >
            <span className="absolute top-5 right-5 font-bold text-gray-100 select-none text-5xl leading-none">
                {number}
            </span>
            <div className="w-14 h-14 rounded-2xl bg-green-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-green-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
            <div className="h-1 w-10 rounded-full bg-emerald-400 group-hover:w-16 transition-all duration-300" />
        </div>
    )
}

export const HowitWorks = () => {
    const headingRef = useReveal()

    return (
        <section className="mt-24 px-4 sm:px-6 max-w-7xl mx-auto">

            <div ref={headingRef} className="fromBottom text-center mb-14">
                <span className="inline-block text-xs font-semibold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-4">
                    How It Works
                </span>
                <h2 className="font-bold text-4xl text-green-900 leading-tight">
                    Explore Baguio in three<br className="hidden sm:block" /> simple steps
                </h2>
                <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto leading-relaxed">
                    Everything you need to plan the perfect Baguio trip — all in one place.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
                <div className="hidden md:block absolute top-10 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent z-0" />
                {STEPS.map((step, i) => <StepCard key={i} {...step} />)}
            </div>

        </section>
    )
}
