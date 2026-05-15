import { useState, useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { useNavigate } from 'react-router-dom'
import { ChatbotModal } from './landingpagechatbot'

export const HeroSection = () => {
    const navigate = useNavigate()
    const [chatOpen, setChatOpen] = useState(false)
    const [visible, setVisible] = useState(false)
    const canvasRef = useRef(null)

    useEffect(() => {
        setVisible(true)
    }, [])

    // Floating particle canvas
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        const particles = Array.from({ length: 40 }, () => ({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 100,
            r: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.6 + 0.3,
            dx: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.5 + 0.2,
        }))

        let raf
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach(p => {
                p.y -= p.speed
                p.x += p.dx
                if (p.y < -10) {
                    p.y = canvas.height + 10
                    p.x = Math.random() * canvas.width
                }
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(120, 210, 150, ${p.opacity})`
                ctx.fill()
            })
            raf = requestAnimationFrame(animate)
        }
        animate()
        return () => cancelAnimationFrame(raf)
    }, [])

    return (
        <section>
            {/* Keyframes injected once */}
            <style>{`
                @keyframes auroraShift {
                    0%   { opacity: 0.7; transform: scale(1) translateY(0); }
                    50%  { opacity: 1;   transform: scale(1.04) translateY(-10px); }
                    100% { opacity: 0.75; transform: scale(1.01) translateY(5px); }
                }
                @keyframes mistDrift {
                    0%   { transform: translateX(-12px) scaleX(1); }
                    100% { transform: translateX(12px) scaleX(1.06); }
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0.55; }
                    50%      { opacity: 1; }
                }
                @keyframes orbPulse {
                    0%   { opacity: 0.18; transform: scale(1); }
                    100% { opacity: 0.34; transform: scale(1.12); }
                }
                .hero-btn-login:hover  { background: rgba(120,210,150,0.12); border-color: rgba(120,210,150,0.85); color: #e8f4ec; transform: scale(1.07); box-shadow: 0 0 22px rgba(60,180,90,0.2); }
                .hero-btn-chat:hover   { background: linear-gradient(135deg,#22803e,#196233); transform: scale(1.07); box-shadow: 0 6px 32px rgba(30,150,70,0.45); }
                .hero-btn-login, .hero-btn-chat { transition: all 0.3s ease; }

                @media (min-height: 900px) and (min-width: 600px) and (orientation: portrait) {
                    .hero-h1 {
                         /* equivalent to text-6xl */
                        margin-top: 10rem;
                    }
                }
            `}</style>

            <div
                className="max-sm:flex max-sm:flex-col max-sm:justify-center h-[calc(100vh-70px)] max-sm:h-screen bg-cover bg-center rounded-t-xl relative overflow-hidden"
                style={{
                    backgroundImage: "url('/imgs/background.png')",
                    backgroundColor: '#0a1a0f',
                    backgroundBlendMode: 'multiply',
                }}
            >
                {/* Glow orbs */}
                <div className="absolute pointer-events-none" style={{ width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,110,55,0.35) 0%, transparent 70%)', top: -120, left: -80, animation: 'orbPulse 8s ease-in-out infinite alternate' }} />
                <div className="absolute pointer-events-none" style={{ width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(15,75,38,0.28) 0%, transparent 70%)', top: 40, right: 80, animation: 'orbPulse 10s ease-in-out infinite alternate', animationDelay: '-4s' }} />

                {/* Aurora overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(34,120,60,0.22) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 75% 20%, rgba(20,90,50,0.16) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 50% 80%, rgba(10,60,30,0.18) 0%, transparent 60%)',
                    animation: 'auroraShift 9s ease-in-out infinite alternate',
                }} />

                {/* Mist */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'radial-gradient(ellipse 120% 40% at 50% 100%, rgba(180,220,190,0.07) 0%, transparent 60%)',
                    animation: 'mistDrift 13s ease-in-out infinite alternate',
                }} />

                {/* Stars */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `
                        radial-gradient(circle 1px at 15% 12%, rgba(255,255,255,0.7) 0%, transparent 100%),
                        radial-gradient(circle 1.5px at 30% 8%, rgba(255,255,255,0.5) 0%, transparent 100%),
                        radial-gradient(circle 1px at 45% 15%, rgba(255,255,255,0.6) 0%, transparent 100%),
                        radial-gradient(circle 1px at 60% 6%, rgba(255,255,255,0.8) 0%, transparent 100%),
                        radial-gradient(circle 1.5px at 75% 11%, rgba(255,255,255,0.4) 0%, transparent 100%),
                        radial-gradient(circle 1px at 85% 18%, rgba(255,255,255,0.55) 0%, transparent 100%),
                        radial-gradient(circle 1px at 92% 9%, rgba(255,255,255,0.65) 0%, transparent 100%),
                        radial-gradient(circle 1px at 8% 22%, rgba(255,255,255,0.5) 0%, transparent 100%),
                        radial-gradient(circle 1.5px at 53% 25%, rgba(255,255,255,0.4) 0%, transparent 100%)`,
                    animation: 'twinkle 5s ease-in-out infinite alternate',
                }} />

                {/* Particle canvas */}
                <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />

                {/* Pine tree silhouette */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 160 }}>
                    <svg viewBox="0 0 1200 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
                        <polygon points="0,160 60,70 120,160" fill="#070f04" opacity="0.95"/>
                        <polygon points="40,160 110,50 180,160" fill="#0a1406" opacity="0.9"/>
                        <polygon points="90,160 150,65 210,160" fill="#070f04" opacity="0.85"/>
                        <polygon points="150,160 215,42 280,160" fill="#0a1406" opacity="0.95"/>
                        <polygon points="200,160 275,58 350,160" fill="#070f04" opacity="0.8"/>
                        <polygon points="310,160 370,36 430,160" fill="#0a1406" opacity="0.9"/>
                        <polygon points="390,160 450,52 510,160" fill="#070f04" opacity="0.85"/>
                        <polygon points="470,160 545,28 620,160" fill="#0a1406" opacity="0.95"/>
                        <polygon points="560,160 635,48 705,160" fill="#070f04" opacity="0.8"/>
                        <polygon points="660,160 725,40 790,160" fill="#0a1406" opacity="0.9"/>
                        <polygon points="740,160 815,22 888,160" fill="#070f04" opacity="0.95"/>
                        <polygon points="840,160 905,46 970,160" fill="#0a1406" opacity="0.85"/>
                        <polygon points="920,160 980,56 1040,160" fill="#070f04" opacity="0.9"/>
                        <polygon points="990,160 1060,35 1130,160" fill="#0a1406" opacity="0.8"/>
                        <polygon points="1070,160 1140,50 1200,160" fill="#070f04" opacity="0.95"/>
                        <rect x="0" y="140" width="1200" height="20" fill="#070f04"/>
                    </svg>
                </div>

                {/* Content */}
                <div className={`px-6 py-32 sm:px-16 md:px-28 lg:px-40 xl:px-52 text-center flex flex-col items-center relative z-10 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    <div className=" hero-h1 transition-all duration-700 ease-in-out hover:scale-105 mb-1">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                            <span style={{ display: 'inline-block', width: 32, height: 1, background: 'rgba(120,210,150,0.4)' }} />
                            <TypeAnimation
                                sequence={[
                                    'Explore Baguio, Smarter', 1000,
                                    'See More Than Just Places', 1000,
                                    'Navigate with Confidence', 1000,
                                ]}
                                wrapper="span"
                                speed={50}
                                style={{
                                    fontSize: '0.8em',
                                    display: 'inline-block',
                                    color: 'rgba(120,210,150,0.88)',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    fontWeight: 500,
                                }}
                                repeat={Infinity}
                            />
                            <span style={{ display: 'inline-block', width: 32, height: 1, background: 'rgba(120,210,150,0.4)' }} />
                        </div>
                    </div>

                    <h1
                        className=' font-bold text-8xl max-sm:text-5xl transition-all duration-700 ease-in-out  hover:tracking-wide'
                        style={{ color: '#e8f4ec', textShadow: '0 2px 40px rgba(0,80,30,0.5)' }}
                    >
                        Navigating the <br className='max-lg:hidden' />
                        <span style={{ fontStyle: 'italic', color: 'rgba(120,210,150,0.9)' }}>City of Pines.</span>
                    </h1>

                    <p className='mt-5 max-w-2xl mx-auto text-center transition-all duration-700 ease-in-out' style={{ color: 'rgba(180,210,185,0.7)' }}
                        onMouseEnter={e => e.target.style.color = 'rgba(200,230,205,0.9)'}
                        onMouseLeave={e => e.target.style.color = 'rgba(180,210,185,0.7)'}
                    >
                        Find where to go, know why it matters, and explore the city with real local insight and AI assistance
                    </p>

                    <div className='flex items-center justify-center mx-auto mt-5 gap-5 max-w-xl'>
                        <button
                            className='hero-btn-login py-2 w-34 text-center px-5 rounded-4xl cursor-pointer active:scale-95'
                            style={{
                                background: 'rgba(232,244,236,0.07)',
                                border: '1.5px solid rgba(120,210,150,0.4)',
                                color: '#c8e8cc',
                                backdropFilter: 'blur(10px)',
                                borderRadius: 999,
                                letterSpacing: '0.12em',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                            }}
                            onClick={() => navigate('/Signin')}
                        >
                            LOGIN
                        </button>

                        <button
                            onClick={() => setChatOpen(true)}
                            className='hero-btn-chat py-2 px-5 cursor-pointer active:scale-95'
                            style={{
                                background: 'linear-gradient(135deg, #1d6b35 0%, #14522a 100%)',
                                border: '1.5px solid rgba(60,160,80,0.45)',
                                color: '#c8edcc',
                                borderRadius: 999,
                                letterSpacing: '0.12em',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                boxShadow: '0 4px 22px rgba(30,120,60,0.35)',
                            }}
                        >
                            CHAT WITH AI
                        </button>
                    </div>
                </div>
            </div>

            {chatOpen && <ChatbotModal onClose={() => setChatOpen(false)} />}
        </section>
    )
}