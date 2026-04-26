import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from './components/nav'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
export const RegisterAcc = () => {
    const navigate = useNavigate()
    const [showEmail, setShowEmail] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleRegister(){
        if(!email || !password) return

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if(response.ok){
            navigate('/signin')  // redirect to login after success
        } else {
            setError(data.error)  // show error message
        }
    }
    return (
        <section className="min-h-screen bg-green-50 grid grid-cols-1 md:grid-cols-2">        
            {/* Left Panel */}
            <div
                className="hidden md:flex flex-col justify-end p-12 bg-cover bg-center relative"
                style={{ backgroundImage: "url('/imgs/background.png')" }}
            >   
                <div className="absolute inset-0 bg-green-900/70" />
                
                <div className="relative z-10">
                    <p className="text-green-300 text-sm font-semibold uppercase tracking-widest mb-2">Benguet Highlands</p>
                    <h1 className="text-white font-bold text-5xl leading-tight">Discover the<br />Highland Mist</h1>
                    <p className="text-green-200 mt-4 max-w-sm">Join our community of travelers and locals. Get real-time advice on the best spots in the City of Pines.</p>
                </div>
            </div>

            {/* Right Panel */}
            <div className="flex items-center justify-center p-8">
                



                <button onClick={() => navigate('/')} className='z-20 absolute top-5 right-4 hover:bg-black/30 bg-blend-darken p-1 rounded-2xl transition-all delay-100'><ArrowUturnLeftIcon className="w-6 h-6 text-black" /></button>
                <div className="w-full max-w-md">
                    
                    <h2 className="text-green-900 font-bold text-3xl">Create Account</h2>
                    <p className="text-gray-500 mt-1 mb-8">Start your Cordillera journey today</p>

                    {/* Social Buttons */}
                    <div className="flex flex-col gap-3">
                        <button className="flex items-center justify-center gap-3 w-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors py-2.5 rounded-xl font-medium text-gray-700">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                            Continue with Google
                        </button>
                        <button className="flex items-center justify-center gap-3 w-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors py-2.5 rounded-xl font-medium text-gray-700">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            Continue with GitHub
                        </button>
                        <button className="flex items-center justify-center gap-3 w-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors py-2.5 rounded-xl font-medium text-gray-700">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                            </svg>
                            Continue with Apple
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-gray-400 text-sm">or continue with email</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Email/Password Form */}
                    {!showEmail ? (
                        <button
                            onClick={() => setShowEmail(true) }
                            className="w-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors py-2.5 rounded-xl font-medium text-gray-500"
                        >
                            Use email & password
                        </button>
                    ) : (
                        <form 
                        onSubmit={(e) => e.preventDefault()}
                            className="flex flex-col gap-4 ">
                            <div>
                                <label className="text-xs font-semibold text-green-900 uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Juan Dela Cruz"
                                    className="mt-1 w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-green-900 uppercase tracking-wider">Email</label>
                                <input
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="name@example.com"
                                    className="mt-1 w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-green-900 uppercase tracking-wider">Password</label>
                                <input 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="••••••••"
                                    className="mt-1 w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button
                                onClick={handleRegister}
                                type="submit"
                                className="w-full bg-green-900 hover:bg-green-700 transition-colors text-white font-semibold py-2.5 rounded-xl mt-1"
                            > Create Account
                            </button>
                        </form>
                    )}

                    <p className="text-center text-gray-400 text-sm mt-6">
                        Already have an account?{' '}
                        <span onClick={() => navigate('/Signin')} className="text-green-800 font-semibold cursor-pointer hover:underline">Sign in</span>
                    </p>
                </div>
            </div>
        </section>
    )
}
