import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

export const RegisterAcc = () => {
    const navigate = useNavigate()
    const [showEmail, setShowEmail] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const canvasRef = useRef(null)
    const animRef = useRef(null)

    async function handleRegister(){
        if (!username || !email || !password) return

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, email, password })
        })
        const data = await response.json()
        if (response.ok) {
            navigate('/signin')
        } else {
            setError(data.error)
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()
        window.addEventListener('resize', resize)

        // Stars
        const stars = Array.from({ length: 80 }, () => ({
            x: Math.random(),
            y: Math.random() * 0.6,
            r: Math.random() * 1.2 + 0.3,
            speed: Math.random() * 0.02 + 0.01,
            phase: Math.random() * Math.PI * 2,
        }))

        // Fireflies
        const fireflies = Array.from({ length: 18 }, () => ({
            x: Math.random(),
            y: 0.3 + Math.random() * 0.5,
            vx: (Math.random() - 0.5) * 0.0008,
            vy: (Math.random() - 0.5) * 0.0008,
            phase: Math.random() * Math.PI * 2,
            speed: 0.02 + Math.random() * 0.03,
        }))

        // Leaves
        const leaves = Array.from({ length: 12 }, () => ({
            x: Math.random(),
            y: -0.05,
            vx: (Math.random() - 0.5) * 0.001,
            vy: 0.0005 + Math.random() * 0.0008,
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.05,
            size: 4 + Math.random() * 4,
            opacity: 0.5 + Math.random() * 0.4,
        }))

        // Pine trees
        const trees = Array.from({ length: 10 }, (_, i) => ({
            x: 0.05 + (i / 9) * 0.9,
            scale: 0.6 + Math.random() * 0.6,
            sway: 0,
            swaySpeed: 0.008 + Math.random() * 0.006,
            swayAmp: 0.012 + Math.random() * 0.012,
            phase: Math.random() * Math.PI * 2,
        }))

        let t = 0

        const drawPine = (x, y, scale, sway) => {
            const w = canvas.width
            const h = canvas.height
            const px = x * w
            const py = y * h
            const s = scale * (h / 4.5)

            ctx.save()
            ctx.translate(px, py)
            ctx.rotate(sway)

            const tiers = [
                { w: s * 0.55, h: s * 0.32, shade: '#1e5c2a' },
                { w: s * 0.44, h: s * 0.28, shade: '#1a5226' },
                { w: s * 0.33, h: s * 0.24, shade: '#24692f' },
                { w: s * 0.22, h: s * 0.20, shade: '#2d7a38' },
            ]

            let ty = 0
            tiers.forEach((tier, i) => {
                ctx.beginPath()
                ctx.moveTo(0, ty - tier.h)
                ctx.lineTo(-tier.w, ty + (i === tiers.length - 1 ? 0 : tier.h * 0.3))
                ctx.lineTo(tier.w, ty + (i === tiers.length - 1 ? 0 : tier.h * 0.3))
                ctx.closePath()
                ctx.fillStyle = tier.shade
                ctx.fill()
                ty -= tier.h * 0.65
            })

            // trunk
            ctx.fillStyle = '#3d2b1a'
            ctx.fillRect(-s * 0.04, 0, s * 0.08, s * 0.18)

            ctx.restore()
        }

        const draw = () => {
            const w = canvas.width
            const h = canvas.height
            t += 0.016

            // Sky gradient - animated
            const skyShift = (Math.sin(t * 0.1) + 1) / 2
            const grad = ctx.createLinearGradient(0, 0, 0, h)
            grad.addColorStop(0, `rgb(${10 + skyShift * 8},${25 + skyShift * 12},${35 + skyShift * 10})`)
            grad.addColorStop(0.45, `rgb(${20 + skyShift * 10},${55 + skyShift * 15},${40 + skyShift * 10})`)
            grad.addColorStop(0.75, `rgb(${30 + skyShift * 8},${80 + skyShift * 12},${55 + skyShift * 8})`)
            grad.addColorStop(1, `rgb(${10 + skyShift * 5},${35 + skyShift * 8},${22 + skyShift * 5})`)
            ctx.fillStyle = grad
            ctx.fillRect(0, 0, w, h)

            // Stars
            stars.forEach(star => {
                const alpha = 0.4 + 0.6 * Math.sin(t * star.speed + star.phase)
                ctx.beginPath()
                ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,255,255,${alpha})`
                ctx.fill()
            })

            // Mountains back
            ctx.beginPath()
            const driftB = Math.sin(t * 0.08) * 12
            ctx.moveTo(0, h)
            ctx.lineTo(driftB + w * 0.0, h * 0.68)
            ctx.lineTo(driftB + w * 0.15, h * 0.42)
            ctx.lineTo(driftB + w * 0.3, h * 0.60)
            ctx.lineTo(driftB + w * 0.48, h * 0.30)
            ctx.lineTo(driftB + w * 0.65, h * 0.50)
            ctx.lineTo(driftB + w * 0.82, h * 0.38)
            ctx.lineTo(driftB + w * 1.0, h * 0.58)
            ctx.lineTo(w, h)
            ctx.closePath()
            ctx.fillStyle = 'rgba(25,65,40,0.55)'
            ctx.fill()

            // Mountains mid
            ctx.beginPath()
            const driftM = Math.sin(t * 0.11 + 1) * 8
            ctx.moveTo(0, h)
            ctx.lineTo(driftM + w * 0.0, h * 0.72)
            ctx.lineTo(driftM + w * 0.12, h * 0.52)
            ctx.lineTo(driftM + w * 0.25, h * 0.65)
            ctx.lineTo(driftM + w * 0.42, h * 0.42)
            ctx.lineTo(driftM + w * 0.58, h * 0.58)
            ctx.lineTo(driftM + w * 0.72, h * 0.46)
            ctx.lineTo(driftM + w * 0.88, h * 0.62)
            ctx.lineTo(w, h * 0.72)
            ctx.lineTo(w, h)
            ctx.closePath()
            ctx.fillStyle = 'rgba(15,48,28,0.72)'
            ctx.fill()

            // Mountains front
            ctx.beginPath()
            ctx.moveTo(0, h)
            ctx.lineTo(w * 0.0, h * 0.82)
            ctx.lineTo(w * 0.1, h * 0.68)
            ctx.lineTo(w * 0.22, h * 0.75)
            ctx.lineTo(w * 0.38, h * 0.60)
            ctx.lineTo(w * 0.52, h * 0.72)
            ctx.lineTo(w * 0.68, h * 0.63)
            ctx.lineTo(w * 0.80, h * 0.70)
            ctx.lineTo(w * 1.0, h * 0.78)
            ctx.lineTo(w, h)
            ctx.closePath()
            ctx.fillStyle = 'rgba(8,28,16,0.88)'
            ctx.fill()

            // Pine trees
            trees.forEach(tree => {
                tree.sway = Math.sin(t * tree.swaySpeed + tree.phase) * tree.swayAmp
                drawPine(tree.x, 0.78 + (1 - tree.scale) * 0.08, tree.scale, tree.sway)
            })

            // Mist
            const mistGrad = ctx.createLinearGradient(0, h * 0.72, 0, h)
            mistGrad.addColorStop(0, 'rgba(160,200,175,0)')
            mistGrad.addColorStop(0.5, `rgba(160,200,175,${0.06 + 0.04 * Math.sin(t * 0.15)})`)
            mistGrad.addColorStop(1, `rgba(180,215,195,${0.12 + 0.05 * Math.sin(t * 0.12)})`)
            ctx.fillStyle = mistGrad
            ctx.fillRect(0, h * 0.72, w, h)

            // Fireflies
            fireflies.forEach(ff => {
                ff.x += ff.vx + Math.sin(t * ff.speed + ff.phase) * 0.001
                ff.y += ff.vy + Math.cos(t * ff.speed * 0.7 + ff.phase) * 0.0006
                if (ff.x < 0.05) ff.x = 0.95
                if (ff.x > 0.95) ff.x = 0.05
                if (ff.y < 0.25) ff.y = 0.75
                if (ff.y > 0.85) ff.y = 0.3
                const glow = (Math.sin(t * ff.speed * 2 + ff.phase) + 1) / 2
                const alpha = 0.3 + glow * 0.7
                const px = ff.x * w
                const py = ff.y * h
                const grd = ctx.createRadialGradient(px, py, 0, px, py, 6)
                grd.addColorStop(0, `rgba(200,255,160,${alpha})`)
                grd.addColorStop(1, 'rgba(180,255,140,0)')
                ctx.beginPath()
                ctx.arc(px, py, 6, 0, Math.PI * 2)
                ctx.fillStyle = grd
                ctx.fill()
                ctx.beginPath()
                ctx.arc(px, py, 1.5, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(230,255,200,${alpha})`
                ctx.fill()
            })

            // Falling leaves
            leaves.forEach(lf => {
                lf.x += lf.vx + Math.sin(t * 0.3 + lf.rot) * 0.0005
                lf.y += lf.vy
                lf.rot += lf.rotSpeed
                if (lf.y > 1.05) {
                    lf.y = -0.05
                    lf.x = Math.random()
                }
                ctx.save()
                ctx.translate(lf.x * w, lf.y * h)
                ctx.rotate(lf.rot)
                ctx.globalAlpha = lf.opacity * (lf.y < 0.05 ? lf.y / 0.05 : 1)
                ctx.beginPath()
                ctx.ellipse(0, 0, lf.size, lf.size * 0.5, 0, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(100,180,120,0.6)'
                ctx.fill()
                ctx.globalAlpha = 1
                ctx.restore()
            })

            // Bottom gradient overlay for text readability
            const textGrad = ctx.createLinearGradient(0, h * 0.55, 0, h)
            textGrad.addColorStop(0, 'rgba(0,0,0,0)')
            textGrad.addColorStop(1, 'rgba(0,0,0,0.65)')
            ctx.fillStyle = textGrad
            ctx.fillRect(0, h * 0.55, w, h)

            animRef.current = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            window.removeEventListener('resize', resize)
            if (animRef.current) cancelAnimationFrame(animRef.current)
        }
    }, [])

    return (
        <section className="min-h-screen grid md:grid-cols-2">

            {/* LEFT — animated canvas background */}
            <div className="hidden md:flex relative overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                />

                {/* Text overlay */}
                <div className="relative z-10 p-12 text-white flex flex-col justify-end w-full">
                    <h1
                        className="text-5xl font-bold leading-tight"
                        style={{ animation: 'fadeUp 1.2s ease forwards' }}
                    >
                        Discover Baguio
                    </h1>
                    <p
                        className="mt-4 text-gray-200 max-w-sm"
                        style={{ animation: 'fadeUp 1.5s ease forwards' }}
                    >
                        Explore the Summer Capital of the philippines with real-time tips, guides, and local insights.
                    </p>
                </div>
            </div>

            {/* RIGHT FORM */}
            <div className="relative flex flex-col items-center justify-center bg-linear-to-br from-green-50 via-white to-green-100 p-6">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-5 right-5 bg-black/10 hover:bg-black/20 p-2 rounded-full transition"
                >
                    <ArrowUturnLeftIcon className="w-5 h-5 text-black" />
                </button>

                {/* CARD */}
                <div
                    className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-green-100"
                    style={{ animation: 'cardPop 0.9s cubic-bezier(0.22,1,0.36,1) forwards' }}
                >
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Create Account</h2>
                    <p className="text-gray-500 text-center mt-2 mb-6">Start your journey today</p>

                    {/* SOCIAL BUTTONS */}
                    <div className="flex flex-col gap-3">
                        <button className="flex items-center justify-center gap-3 w-full border border-gray-200 hover:bg-gray-50 py-2.5 rounded-xl font-medium transition">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
                            Continue with Google
                        </button>

                        <button className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.41c0-2.37 1.41-3.68 3.57-3.68 1.03 0 2.1.18 2.1.18v2.31h-1.18c-1.16 0-1.52.72-1.52 1.46v1.75h2.59l-.41 2.9h-2.18V22c4.78-.75 8.44-4.91 8.44-9.93z"/>
                            </svg>
                            Continue with Facebook
                        </button>

                        <button className="flex items-center justify-center gap-3 w-full bg-black hover:bg-gray-900 text-white py-2.5 rounded-xl font-medium transition">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                            </svg>
                            Continue with Apple
                        </button>
                    </div>

                    {/* DIVIDER */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-300" />
                        <span className="text-gray-400 text-sm">or</span>
                        <div className="flex-1 h-px bg-gray-300" />
                    </div>

                    {/* FORM */}
                    {!showEmail ? (
                        <button
                            onClick={() => setShowEmail(true)}
                            className="w-full border border-gray-300 hover:bg-gray-50 py-2.5 rounded-xl font-medium text-gray-600 transition"
                        >
                            Use email & password
                        </button>
                    ) : (
                        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                            <input type="text" placeholder="Full Name"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-600 outline-none"
                            />
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                                placeholder="Email"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-600 outline-none"
                            />
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                                placeholder="Password"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-600 outline-none"
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button
                                onClick={handleRegister}
                                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2.5 rounded-xl transition"
                            >
                                Create Account
                            </button>
                        </form>
                    )}

                    <p className="text-center text-gray-500 text-sm mt-6">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate('/Signin')}
                            className="text-green-700 font-semibold cursor-pointer hover:underline"
                        >
                            Sign in
                        </span>
                    </p>
                </div>

                <p className="text-xs text-gray-500 mt-6">
                    © 2026 Baguio Tourist System. All rights reserved.
                </p>
            </div>

            {/* Global keyframes */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes cardPop {
                    from { opacity: 0; transform: scale(0.96) translateY(20px); }
                    to   { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </section>
    )
}
