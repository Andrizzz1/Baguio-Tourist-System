import { useNavigate } from 'react-router-dom'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import { GoogleAuthProvider,signInWithPopup,OAuthProvider  } from "firebase/auth"
import { auth } from './firebase'
export const Signin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [mounted, setMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [focusedField, setFocusedField] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const provider = new GoogleAuthProvider();
    const providerApple = new OAuthProvider('apple.com');
    useEffect(() => {
        // Trigger mount animation
        const t = setTimeout(() => setMounted(true), 50)
        return () => clearTimeout(t)
    }, [])

    async function handleLogin() {
        if (!email || !password) {
            setError('Please fill in all fields.')
            return
        }
        setIsLoading(true)
        setError("")
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user))
                navigate('/dashboard')
            } else {
                setError(data.error || 'Invalid credentials')
            }
        } catch {
            setError('Connection error. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

     const handleGoogleSignIn = async () => {
            try {
                const result = await signInWithPopup(auth, provider);
                const firebaseUser = result.user;
    
                const response = await fetch("/api/social-login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: firebaseUser.displayName,
                        email: firebaseUser.email,
                        provider: "google"
                    })
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    navigate("/dashboard");
                } else {
                    setError(data.error || "Google login failed");
                }
            } catch (error) {
                console.log("Google sign in error:", error);
                setError(error.message);
            }
            };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@300;400;500;600&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                .signin-root {
                    min-height: 100vh;
                    display: grid;
                    grid-template-columns: 1fr;
                    font-family: 'DM Sans', sans-serif;
                    background: #f0f7f0;
                    overflow: hidden;
                }

                @media (min-width: 768px) {
                    .signin-root { grid-template-columns: 1fr 1fr; }
                }

                /* ── Left Panel ── */
                .left-panel {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    position: relative;
                    background: #f0f7f0;
                }

                .back-btn {
                    position: absolute;
                    top: 1.25rem;
                    left: 1rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.4rem;
                    border-radius: 0.75rem;
                    transition: background 0.2s, transform 0.2s;
                    z-index: 20;
                    opacity: 0;
                    transform: translateX(-12px);
                    animation: slideInLeft 0.5s ease 0.1s forwards;
                    
                }
                .back-btn:hover { background: rgba(0,0,0,0.07); transform: translateX(-2px); }
                .back-btn svg { color: #1a4731; width: 1.4rem; height: 1.4rem; display: block; }

                .form-card {
                    width: 100%;
                    max-width: 420px;
                }

                /* Staggered entrance animations */
                .fade-up {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeUp 0.6s ease forwards;
                }
                .delay-1 { animation-delay: 0.15s; }
                .delay-2 { animation-delay: 0.25s; }
                .delay-3 { animation-delay: 0.35s; }
                .delay-4 { animation-delay: 0.45s; }
                .delay-5 { animation-delay: 0.55s; }
                .delay-6 { animation-delay: 0.65s; }
                .delay-7 { animation-delay: 0.75s; }

                @keyframes fadeUp {
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInLeft {
                    to { opacity: 1; transform: translateX(0); }
                }

                .heading {
                    font-family: 'Fraunces', serif;
                    font-size: 2.4rem;
                    font-weight: 600;
                    color: #1a4731;
                    line-height: 1.1;
                    letter-spacing: -0.02em;
                }

                .subheading {
                    color: #7a9e89;
                    margin-top: 0.4rem;
                    margin-bottom: 2rem;
                    font-size: 0.95rem;
                    font-weight: 300;
                }

                /* ── Input Fields ── */
                .field-group { display: flex; flex-direction: column; gap: 1rem; }

                .field { display: flex; flex-direction: column; gap: 0.35rem; }

                .field-label {
                    font-size: 0.7rem;
                    font-weight: 600;
                    color: #1a4731;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }

                .field-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .forgot-link {
                    font-size: 0.75rem;
                    color: #2d6a4f;
                    font-weight: 600;
                    cursor: pointer;
                    text-decoration: none;
                    transition: color 0.2s, opacity 0.2s;
                    background: none;
                    border: none;
                }
                .forgot-link:hover { opacity: 0.7; text-decoration: underline; }

                .input-wrapper {
                    position: relative;
                }

                .input-field {
                    width: 100%;
                    border: 1.5px solid #d4e8da;
                    background: #fff;
                    border-radius: 0.875rem;
                    padding: 0.75rem 1rem;
                    font-size: 0.95rem;
                    color: #2d3a32;
                    font-family: 'DM Sans', sans-serif;
                    outline: none;
                    transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.15s ease;
                }
                .input-field::placeholder { color: #b0c8ba; }
                .input-field:focus {
                    border-color: #2d6a4f;
                    box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
                    transform: translateY(-1px);
                }

                /* ── Error message ── */
                .error-msg {
                    background: #fff0f0;
                    border: 1px solid #fca5a5;
                    border-radius: 0.75rem;
                    padding: 0.6rem 1rem;
                    font-size: 0.85rem;
                    color: #b91c1c;
                    animation: shakeX 0.4s ease;
                }
                @keyframes shakeX {
                    0%,100% { transform: translateX(0); }
                    20% { transform: translateX(-6px); }
                    40% { transform: translateX(6px); }
                    60% { transform: translateX(-4px); }
                    80% { transform: translateX(4px); }
                }

                /* ── Submit Button ── */
                .submit-btn {
                    width: 100%;
                    background: #1a4731;
                    color: #fff;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 1rem;
                    font-weight: 600;
                    padding: 0.8rem;
                    border: none;
                    border-radius: 0.875rem;
                    cursor: pointer;
                    margin-top: 0.25rem;
                    position: relative;
                    overflow: hidden;
                    transition: background 0.25s ease, transform 0.15s ease, box-shadow 0.25s ease;
                    letter-spacing: 0.01em;
                }
                .submit-btn::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
                    transform: translateX(-100%);
                    transition: transform 0.5s ease;
                }
                .submit-btn:hover:not(:disabled) {
                    background: #2d6a4f;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(26, 71, 49, 0.3);
                }
                .submit-btn:hover:not(:disabled)::after { transform: translateX(100%); }
                .submit-btn:active:not(:disabled) { transform: translateY(0); box-shadow: none; }
                .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

                /* Spinner */
                .spinner {
                    display: inline-block;
                    width: 16px; height: 16px;
                    border: 2px solid rgba(255,255,255,0.4);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                    vertical-align: middle;
                    margin-right: 8px;
                }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* ── Divider ── */
                .divider {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin: 1.5rem 0;
                }
                .divider-line { flex: 1; height: 1px; background: #d4e8da; }
                .divider-text { color: #a0b8aa; font-size: 0.85rem; white-space: nowrap; }

                /* ── Social Buttons ── */
                .social-group { display: flex; flex-direction: column; gap: 0.6rem; }

                .social-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.65rem;
                    width: 100%;
                    border: 1.5px solid #d4e8da;
                    background: #fff;
                    border-radius: 0.875rem;
                    padding: 0.7rem;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: #3a4f40;
                    cursor: pointer;
                    transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
                    position: relative;
                    overflow: hidden;
                }
                .social-btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: #e8f5ee;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.25s ease;
                    z-index: 0;
                }
                .social-btn:hover::before { transform: scaleX(1); }
                .social-btn:hover { border-color: #9dc4ae; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.06); color: #000; }
                .social-btn:hover span,
                .social-btn:hover img,
                .social-btn:hover svg { color: #000; }
                .social-btn:active { transform: translateY(0); }
                .social-btn > * { position: relative; z-index: 1; color: inherit; }
                .social-btn img { width: 1.1rem; height: 1.1rem; }
                .social-btn svg { width: 1.1rem; height: 1.1rem; flex-shrink: 0; }

                /* ── Footer text ── */
                .footer-text {
                    text-align: center;
                    color: #7a9e89;
                    font-size: 0.85rem;
                    margin-top: 1.5rem;
                }
                .footer-link {
                    color: #1a4731;
                    font-weight: 600;
                    cursor: pointer;
                    background: none;
                    border: none;
                    font-family: 'DM Sans', sans-serif;
                    font-size: inherit;
                    padding: 0;
                    position: relative;
                }
                .footer-link::after {
                    content: '';
                    position: absolute;
                    bottom: -1px; left: 0; right: 0;
                    height: 1px;
                    background: #1a4731;
                    transform: scaleX(0);
                    transition: transform 0.2s ease;
                }
                .footer-link:hover::after { transform: scaleX(1); }

                /* ── Right Panel ── */
                .right-panel {
                    display: none;
                    position: relative;
                    overflow: hidden;
                }

                @media (min-width: 768px) {
                    .right-panel { display: flex; flex-direction: column; justify-content: flex-end; padding: 3rem; }
                }

                .right-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(160deg, rgba(10,40,20,0.5) 0%, rgba(26,71,49,0.85) 100%);
                }

                /* Floating decorative orbs */
                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.25;
                    animation: floatOrb 8s ease-in-out infinite;
                }
                .orb-1 {
                    width: 300px; height: 300px;
                    background: #52b788;
                    top: -80px; right: -80px;
                    animation-delay: 0s;
                }
                .orb-2 {
                    width: 200px; height: 200px;
                    background: #95d5b2;
                    bottom: 30%; left: -60px;
                    animation-delay: 3s;
                }
                @keyframes floatOrb {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-20px) scale(1.05); }
                }

                .right-content {
                    position: relative;
                    z-index: 10;
                }

                .eyebrow {
                    color: #74c69d;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    margin-bottom: 0.75rem;
                    opacity: 0;
                    transform: translateY(10px);
                    animation: fadeUp 0.7s ease 0.3s forwards;
                }

                .right-heading {
                    font-family: 'Fraunces', serif;
                    font-size: clamp(2.5rem, 4vw, 3.5rem);
                    font-weight: 600;
                    color: #fff;
                    line-height: 1.08;
                    letter-spacing: -0.02em;
                    opacity: 0;
                    transform: translateY(10px);
                    animation: fadeUp 0.7s ease 0.45s forwards;
                }

                .right-sub {
                    color: #b7e4c7;
                    margin-top: 1rem;
                    font-size: 0.95rem;
                    font-weight: 300;
                    max-width: 26rem;
                    line-height: 1.6;
                    opacity: 0;
                    transform: translateY(10px);
                    animation: fadeUp 0.7s ease 0.6s forwards;
                }

                /* ── Background image pan + zoom ── */
                .right-panel {
                    animation: none; /* overridden below on the bg pseudo */
                }
                .bg-image {
                    position: absolute;
                    inset: 0;
                    background-image: url('/imgs/background.png');
                    background-size: cover;
                    background-position: center;
                    animation: kenBurns 18s ease-in-out infinite alternate;
                    transform-origin: center center;
                }
                @keyframes kenBurns {
                    0%   { transform: scale(1)    translateX(0%)   translateY(0%); }
                    25%  { transform: scale(1.06) translateX(-1%)  translateY(-1%); }
                    50%  { transform: scale(1.1)  translateX(1%)   translateY(1%); }
                    75%  { transform: scale(1.06) translateX(-0.5%) translateY(0.5%); }
                    100% { transform: scale(1)    translateX(0%)   translateY(0%); }
                }

                /* ── Social icon bounce-in ── */
                .social-btn img,
                .social-btn svg {
                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;
                }
                .social-btn:hover img,
                .social-btn:hover svg {
                    transform: scale(1.25) rotate(-6deg);
                    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.18));
                }

                /* ── Icon entrance pop ── */
                .social-btn:nth-child(1) img { animation: iconPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.7s both; }
                .social-btn:nth-child(2) svg { animation: iconPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.8s both; }
                .social-btn:nth-child(3) svg { animation: iconPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.9s both; }
                @keyframes iconPop {
                    0%   { opacity: 0; transform: scale(0) rotate(-20deg); }
                    100% { opacity: 1; transform: scale(1) rotate(0deg); }
                }

                /* Decorative tag pills */
                .tag-row {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    margin-top: 1.5rem;
                    opacity: 0;
                    transform: translateY(10px);
                    animation: fadeUp 0.7s ease 0.75s forwards;
                }
                .tag {
                    background: rgba(255,255,255,0.12);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: #d8f3dc;
                    font-size: 0.75rem;
                    padding: 0.3rem 0.75rem;
                    border-radius: 99px;
                    font-weight: 500;
                    letter-spacing: 0.03em;
                }
            `}</style>

            <section className="signin-root">

                {/* Left Panel — Form */}
                <div className="left-panel">
                    <button onClick={() => navigate('/')} className="back-btn">
                        <ArrowUturnLeftIcon />
                    </button>

                    <div className="form-card">

                        <div className="fade-up delay-1">
                            <h2 className="heading">Welcome Back</h2>
                            <p className="subheading">Sign in to continue your Cordillera journey</p>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="error-msg" style={{ marginBottom: '1rem' }}>{error}</p>
                        )}

                        {/* Form */}
                        <form className="field-group" onSubmit={(e) => e.preventDefault()}>

                            <div className="field fade-up delay-2">
                                <label className="field-label">Email</label>
                                <div className="input-wrapper">
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        type="email"
                                        placeholder="name@example.com"
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div className="field fade-up delay-3">
                                <div className="field-row">
                                    <label className="field-label">Password</label>
                                </div>
                                <div className="input-wrapper" style={{ position: 'relative' }}>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField(null)}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="input-field"
                                        style={{ paddingRight: '3rem' }} // space for button
                                    />  

                               <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        lineHeight: 0
                                    }}
                                >
                                    {showPassword ? (
                                        // Eye OFF (hidden)
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            style={{ display: 'block' }}
                                        >
                                            <path d="M2 2L22 22" stroke="#2d6a4f" strokeWidth="2" />
                                            <path d="M10.58 10.58C10.21 10.95 10 11.46 10 12C10 13.1 10.9 14 12 14C12.54 14 13.05 13.79 13.42 13.42" stroke="#2d6a4f" strokeWidth="2" />
                                            <path d="M9.88 5.09C10.55 4.86 11.26 4.75 12 4.75C16.5 4.75 20.27 7.61 21.5 12C21.05 13.53 20.22 14.91 19.13 16.02M6.1 6.1C4.66 7.23 3.55 8.77 2.5 12C3.73 16.39 7.5 19.25 12 19.25C13.11 19.25 14.18 19.05 15.18 18.68" stroke="#2d6a4f" strokeWidth="2" />
                                        </svg>
                                    ) : (
                                        // Eye ON (visible)
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            style={{ display: 'block' }}
                                        >
                                            <path d="M1.5 12C2.73 7.61 6.5 4.75 12 4.75C17.5 4.75 21.27 7.61 22.5 12C21.27 16.39 17.5 19.25 12 19.25C6.5 19.25 2.73 16.39 1.5 12Z" stroke="#2d6a4f" strokeWidth="2" />
                                            <circle cx="12" cy="12" r="3" stroke="#2d6a4f" strokeWidth="2" />
                                        </svg>
                                    )}
                                </button>
                                </div>
                                <button
                                    type="button"
                                    className="forgot-link"
                                    style={{
                                        marginLeft: 'auto',
                                        marginTop: '4px', // 👈 move down (try 2px, 4px, 6px, etc.)
                                        transition: 'all 0.25s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.opacity = '0.7'
                                        e.currentTarget.style.transform = 'translateX(-2px)'
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.opacity = '1'
                                        e.currentTarget.style.transform = 'translateX(0)'
                                    }}
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <div className="fade-up delay-4">
                                <button
                                    onClick={handleLogin}
                                    type="submit"
                                    className="submit-btn"
                                    disabled={isLoading}
                                >
                                    {isLoading && <span className="spinner" />}
                                    {isLoading ? 'Signing In…' : 'Sign In'}
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="divider fade-up delay-5">
                            <div className="divider-line" />
                            <span className="divider-text">or continue with</span>
                            <div className="divider-line" />
                        </div>

                        {/* Social Buttons */}
                        <div  className="social-group fade-up delay-6">
                            <button onClick={handleGoogleSignIn}  className="social-btn">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                                <span style={{ position: 'relative', zIndex: 1, color: '#111' }}>Continue with Google</span>
                            </button>
                            <button className="social-btn">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ position: 'relative', zIndex: 1 }}>
                                    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.41c0-2.37 1.41-3.68 3.57-3.68 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.46v1.75h2.59l-.41 2.9h-2.18V22c4.78-.75 8.44-4.91 8.44-9.93z"/>
                                </svg>
                                <span style={{ position: 'relative', zIndex: 1, color: '#111' }}>Continue with Facebook</span>
                            </button>

                        </div>

                        <p className="footer-text fade-up delay-7">
                            Don't have an account?{' '}
                            <button onClick={() => navigate('/Register')} className="footer-link">Sign up</button>
                        </p>
                    </div>
                </div>

                {/* Right Panel — Visual */}
                <div className="right-panel">
                    <div className="bg-image" />
                    <div className="right-overlay" />
                    <div className="orb orb-1" />
                    <div className="orb orb-2" />
                    <div className="right-content">
                        <p className="eyebrow">City of Pines</p>
                        <h1 className="right-heading">Your Journey<br />Awaits</h1>
                        <p className="right-sub">Explore hidden gems, local favorites, and AI-powered travel tips — all in one place.</p>
                        <div className="tag-row">
                            <span className="tag">🌲 Scenic Trails</span>
                            <span className="tag">🗺️ AI Travel Tips</span>
                            <span className="tag">🍃 Local Favorites</span>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
