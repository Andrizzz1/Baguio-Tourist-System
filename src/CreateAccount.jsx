import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUturnLeftIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from './firebase'

export const RegisterAcc = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [focusedField, setFocusedField] = useState(null)

    const provider = new GoogleAuthProvider()

    async function handleRegister() {
        if (!username || !email || !password) return
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        })
        const data = await response.json()
        if (response.ok) {
            navigate('/signin')
        } else {
            setError(data.error)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const firebaseUser = result.user
            const response = await fetch("/api/social-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: firebaseUser.displayName,
                    email: firebaseUser.email,
                    provider: "google"
                })
            })
            const data = await response.json()
            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user))
                navigate("/dashboard")
            } else {
                setError(data.error || "Google login failed")
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <section className="min-h-screen grid md:grid-cols-2">

            {/* LEFT — photo background with effects */}
            <div className="hidden md:flex relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85&auto=format&fit=crop"
                    alt="Pine forest"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ animation: 'slowZoom 20s ease-in-out infinite alternate' }}
                />
                <div className="left-mist-1 absolute inset-0" />
                <div className="left-mist-2 absolute inset-0" />
                <div className="absolute inset-0" style={{
                    background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%),
                                 linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.72) 100%)`
                }} />
                <div className="left-particles absolute inset-0 pointer-events-none" />
                <div className="absolute top-8 left-8 z-10">
                    <p className="text-white/60 text-xs tracking-[0.25em] uppercase font-medium"
                       style={{ animation: 'fadeUp 1.4s ease forwards', fontFamily: '"Cormorant Garamond", Georgia, serif' }}>
                        Baguio Tourist System
                    </p>
                </div>
                <div className="relative z-10 p-10 text-white flex flex-col justify-end w-full">
                    <div style={{ animation: 'fadeUp 1.2s ease forwards' }}>
                        <h1 className="text-5xl font-bold leading-tight"
                            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontWeight: 700, letterSpacing: '-0.01em' }}>
                            Discover<br />Baguio<br />
                        </h1>
                        <p className="mt-4 text-white/75 max-w-xs leading-relaxed"
                           style={{ animation: 'fadeUp 1.5s ease forwards', fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', fontSize: '1.05rem' }}>
                            Explore the Summer Capital of the philippines with real-time tips, guides, and local insights.
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="relative flex flex-col items-center justify-center min-h-screen p-6"
                 style={{ background: '#f0ede8' }}>

                <button onClick={() => navigate('/')}
                    className="absolute top-5 right-5 bg-black/10 hover:bg-black/20 p-2 rounded-full transition">
                    <ArrowUturnLeftIcon className="w-5 h-5 text-black" />
                </button>

                {/* CARD */}
                <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-sm"
                     style={{ animation: 'cardPop 0.8s cubic-bezier(0.22,1,0.36,1) forwards' }}>

                    {/* Header */}
                    <div style={{ animation: 'fadeUp 0.7s ease forwards', opacity: 0, animationDelay: '0.1s' }}>
                        <h2 className="text-2xl font-bold text-gray-900"
                            style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.75rem' }}>
                            Create your account
                        </h2>
                        <p className="text-gray-500 mt-1 text-sm leading-snug">
                            Join our community of heritage seekers and nature lovers.
                        </p>
                    </div>

                    {/* FORM FIELDS */}
                    <div className="mt-6 flex flex-col gap-4">

                        {/* Full Name */}
                        <div style={{ animation: 'fadeUp 0.7s ease forwards', opacity: 0, animationDelay: '0.2s' }}>
                            <label className="block text-xs font-semibold tracking-widest text-gray-500 mb-1.5 uppercase">
                                Full Name
                            </label>
                            <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all duration-200 ${focusedField === 'name' ? 'border-green-700 bg-white shadow-sm' : 'border-transparent bg-gray-100'}`}>
                                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Juan Dela Cruz"
                                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div style={{ animation: 'fadeUp 0.7s ease forwards', opacity: 0, animationDelay: '0.3s' }}>
                            <label className="block text-xs font-semibold tracking-widest text-gray-500 mb-1.5 uppercase">
                                Email Address
                            </label>
                            <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all duration-200 ${focusedField === 'email' ? 'border-green-700 bg-white shadow-sm' : 'border-transparent bg-gray-100'}`}>
                                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="hello@example.com"
                                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ animation: 'fadeUp 0.7s ease forwards', opacity: 0, animationDelay: '0.4s' }}>
                            <label className="block text-xs font-semibold tracking-widest text-gray-500 mb-1.5 uppercase">
                                Password
                            </label>
                            <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all duration-200 ${focusedField === 'password' ? 'border-green-700 bg-white shadow-sm' : 'border-transparent bg-gray-100'}`}>
                                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="••••••••"
                                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                                />
                                <button type="button" onClick={() => setShowPassword(v => !v)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors">
                                    {showPassword
                                        ? <EyeSlashIcon className="w-4 h-4" />
                                        : <EyeIcon className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-xs -mt-2">{error}</p>}

                        {/* Submit */}
                        <div style={{ animation: 'fadeUp 0.7s ease forwards', opacity: 0, animationDelay: '0.5s' }}>
                            <button
                                onClick={handleRegister}
                                className="w-full text-white font-semibold py-3.5 rounded-2xl transition-all duration-200 hover:opacity-90 active:scale-[0.98] mt-1"
                                style={{ background: '#1e3a1e', fontSize: '0.95rem' }}>
                                Create Account
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5"
                         style={{ animation: 'fadeUp 0.7s ease forwards', opacity: 0, animationDelay: '0.6s' }}>
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-gray-400 text-xs tracking-widest uppercase">or</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Social buttons */}
                    <div className="flex gap-3"
                         style={{ animation: 'fadeUp 0.7s ease forwards', opacity: 0, animationDelay: '0.7s' }}>
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 active:scale-[0.97] text-sm font-medium text-gray-700">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
                            Google
                        </button>
                        <button
                            onClick={handleGoogleSignIn}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 active:scale-[0.97] text-sm font-medium text-gray-700">
                            <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.41c0-2.37 1.41-3.68 3.57-3.68 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.46v1.75h2.59l-.41 2.9h-2.18V22c4.78-.75 8.44-4.91 8.44-9.93z"/>
                            </svg>
                            Facebook
                        </button>
                    </div>

                    {/* Sign in link */}
                    <p className="text-center text-gray-500 text-sm mt-6"
                       style={{ animation: 'fadeUp 0.7s ease forwards', opacity: 0, animationDelay: '0.8s' }}>
                        Already have an account?{" "}
                        <span onClick={() => navigate('/Signin')}
                            className="font-semibold cursor-pointer hover:underline"
                            style={{ color: '#1e3a1e' }}>
                            Sign In
                        </span>
                    </p>
                </div>

                <p className="text-xs text-gray-400 mt-5"
                   style={{ animation: 'fadeUp 0.7s ease forwards', opacity: 0, animationDelay: '0.9s' }}>
                    © 2026 Baguio Tourist System. All rights reserved.
                </p>
            </div>

            {/* Global keyframes */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes cardPop {
                    from { opacity: 0; transform: scale(0.95) translateY(24px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes slowZoom {
                    from { transform: scale(1); }
                    to   { transform: scale(1.08); }
                }
                @keyframes mistDrift1 {
                    0%   { transform: translateX(-8%) translateY(0); opacity: 0.55; }
                    50%  { transform: translateX(4%) translateY(-2%); opacity: 0.7; }
                    100% { transform: translateX(-8%) translateY(0); opacity: 0.55; }
                }
                @keyframes mistDrift2 {
                    0%   { transform: translateX(6%) translateY(0); opacity: 0.4; }
                    50%  { transform: translateX(-3%) translateY(3%); opacity: 0.6; }
                    100% { transform: translateX(6%) translateY(0); opacity: 0.4; }
                }
                @keyframes ffFloat {
                    0%   { transform: translate(0,0) scale(1); opacity: 0; }
                    20%  { opacity: 1; }
                    80%  { opacity: 0.8; }
                    100% { transform: translate(var(--dx),var(--dy)) scale(0.5); opacity: 0; }
                }
                .left-mist-1 {
                    background: radial-gradient(ellipse 120% 60% at 20% 70%, rgba(200,220,210,0.35) 0%, transparent 70%),
                                radial-gradient(ellipse 80% 40% at 80% 80%, rgba(180,210,195,0.28) 0%, transparent 60%);
                    animation: mistDrift1 14s ease-in-out infinite;
                }
                .left-mist-2 {
                    background: radial-gradient(ellipse 100% 50% at 60% 60%, rgba(210,230,220,0.22) 0%, transparent 65%),
                                radial-gradient(ellipse 70% 35% at 10% 90%, rgba(190,215,200,0.18) 0%, transparent 55%);
                    animation: mistDrift2 19s ease-in-out infinite;
                }
                .left-particles::before,
                .left-particles::after {
                    content: '';
                    position: absolute;
                    width: 4px; height: 4px;
                    border-radius: 50%;
                    background: rgba(200,255,160,0.85);
                    box-shadow:
                        12vw 62vh 6px 2px rgba(200,255,160,0.5),
                        28vw 71vh 4px 1px rgba(210,255,170,0.6),
                        41vw 58vh 5px 2px rgba(195,250,155,0.4),
                        8vw  78vh 4px 1px rgba(205,255,165,0.55),
                        35vw 80vh 6px 2px rgba(200,255,160,0.45),
                        22vw 55vh 3px 1px rgba(215,255,175,0.5),
                        48vw 66vh 5px 1px rgba(200,255,160,0.4),
                        5vw  55vh 4px 2px rgba(205,255,165,0.6);
                    animation: ffFloat 6s ease-in-out infinite alternate;
                    --dx: 15px; --dy: -20px;
                }
                .left-particles::after {
                    animation-delay: -3s;
                    --dx: -12px; --dy: 18px;
                    box-shadow:
                        18vw 68vh 5px 2px rgba(200,255,160,0.5),
                        33vw 75vh 4px 1px rgba(210,255,170,0.45),
                        44vw 53vh 6px 2px rgba(195,250,155,0.55),
                        15vw 82vh 4px 1px rgba(205,255,165,0.4),
                        39vw 61vh 5px 2px rgba(200,255,160,0.6),
                        7vw  72vh 3px 1px rgba(215,255,175,0.4),
                        50vw 70vh 4px 1px rgba(200,255,160,0.5),
                        26vw 59vh 5px 2px rgba(205,255,165,0.45);
                }
            `}</style>
        </section>
    )
}
