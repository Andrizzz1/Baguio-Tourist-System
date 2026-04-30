import { useNavigate } from 'react-router-dom'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'

export const Signin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [mounted, setMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [focusedField, setFocusedField] = useState(null)

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
            if(response.ok){
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
                    background: #f0f7f0;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.25s ease;
                    z-index: 0;
                }
                .social-btn:hover::before { transform: scaleX(1); }
                .social-btn:hover { border-color: #9dc4ae; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
                .social-btn:active { transform: translateY(0); }
                .social-btn > * { position: relative; z-index: 1; }
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
                    background-image: url('/imgs/bg.png');
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
                                    <button type="button" className="forgot-link">Forgot password?</button>
                                </div>
                                <div className="input-wrapper">
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField(null)}
                                        type="password"
                                        placeholder="••••••••"
                                        className="input-field"
                                    />
                                </div>
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
                        <div className="social-group fade-up delay-6">
                            <button className="social-btn">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                                Continue with Google
                            </button>
                            <button className="social-btn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                Continue with GitHub
                            </button>
                            <button className="social-btn">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                Continue with Apple
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
                        <p className="eyebrow">Summer Capital of the philippines</p>
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
