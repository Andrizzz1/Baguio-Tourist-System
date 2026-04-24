import { useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { useNavigate } from 'react-router-dom'
import { ChatbotModal } from './landingpagechatbot'

export const HeroSection = () => {
    const navigate = useNavigate()
    const [chatOpen, setChatOpen] = useState(false)

    return (
        <section>
            <div
                className="max-sm:flex max-sm:flex-col max-sm:justify-center h-[calc(100vh-70px)] max-sm:h-screen bg-cover bg-center rounded-t-xl bg-black/50 bg-blend-darken"
                style={{ backgroundImage: "url('/imgs/background.png')" }}
            >
                <div className='hiddenEl px-65 py-40 max-xl:px-40 max-lg:px-35 max-md:px-20 max-sm:px-2 text-center max-sm:flex max-sm:flex-col'>
                    <TypeAnimation
                        sequence={[
                            'Explore Baguio, Smarter',
                            1000,
                            'See More Than Just Places',
                            1000,
                            'See More Than Just Places',
                            1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ fontSize: '1em', display: 'inline-block', color: "oklch(87.2% 0.01 258.338)" }}
                        repeat={Infinity}
                    />
                    <h1 className='text-white font-bold text-8xl max-sm:text-5xl'>Navigating the <br className='max-lg:hidden' /> City of Pines.</h1>
                    <p className='text-gray-400 mt-5 max-w-2xl mx-auto text-center'>Find where to go, know why it matters, and explore the city with real local insight and AI assistance</p>
                    <div className='flex items-center justify-center mx-auto mt-5 gap-5 max-w-xl'>
                        <a
                            className='bg-white text-green-900 py-2 w-34 text-center px-5 rounded-4xl border-green-900 border-2 hover:bg-gray-300 hover:text-green-600 transition-all duration-300 cursor-pointer'
                            onClick={() => navigate('/Signin')}
                        >
                            LOGIN
                        </a>
                        <button
                            onClick={() => setChatOpen(true)}
                            className='hover:bg-green-600 duration-400 transition-all bg-green-900 text-white py-2 px-5 rounded-4xl cursor-pointer'
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
