import { useState, useRef, useEffect } from 'react';
import {
    MagnifyingGlassIcon, Bars3Icon, XMarkIcon, Cog6ToothIcon,
    ArrowRightOnRectangleIcon, ChevronDownIcon, MapPinIcon,
    SunIcon, MoonIcon, UserCircleIcon, CameraIcon, CheckIcon
} from '@heroicons/react/24/solid';
import { useNavigate, useLocation } from 'react-router-dom';
import { ALL_PLACES } from '../data/places';

const NAV_LINKS = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Explore',   path: '/explore'   },
    { label: 'Community', path: '/Community' },
    { label: 'Saved',     path: '/saved'     },
]

/* ── Settings Modal ── */
function SettingsModal({ onClose, darkMode, setDarkMode }) {
    const [tab, setTab]           = useState('appearance')
    const [name, setName]         = useState('')
    const [avatar, setAvatar]     = useState(null)
    const [saved, setSaved]       = useState(false)
    const avatarRef               = useRef(null)
    const modalRef                = useRef(null)

    const user = JSON.parse(localStorage.getItem('user')) || {}

    useEffect(() => {
        setName(user.username || '')
        setAvatar(user.avatar || null)
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = '' }
    }, [])

    // close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) onClose()
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleAvatar = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onloadend = () => setAvatar(reader.result)
        reader.readAsDataURL(file)
    }

    const handleSaveProfile = () => {
        const updated = { ...user, username: name.trim() || user.username, avatar }
        localStorage.setItem('user', JSON.stringify(updated))
        setSaved(true)
        setTimeout(() => { setSaved(false); onClose(); window.location.reload() }, 1000)
    }

    const toggleDark = () => {
        const next = !darkMode
        setDarkMode(next)
        localStorage.setItem('darkMode', next ? '1' : '0')
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease'
    }

    const initials = (user.username || 'T').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div ref={modalRef} className="bg-white dark-card rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-800 dark-text text-lg">Settings</h2>
                    <button onClick={onClose} className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 px-6">
                    {[
                        { id: 'appearance', label: 'Appearance' },
                        { id: 'profile',    label: 'Profile'    },
                    ].map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-all duration-200 -mb-px
                                ${tab === t.id
                                    ? 'border-green-700 text-green-900'
                                    : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="p-6">

                    {/* ── Appearance Tab ── */}
                    {tab === 'appearance' && (
                        <div className="flex flex-col gap-4">
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Theme</p>

                            {/* Light */}
                            <button
                                onClick={() => { if (darkMode) toggleDark() }}
                                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl border-2 transition-all duration-200
                                    ${!darkMode ? 'border-green-700 bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                                        <SunIcon className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-gray-800">Light Mode</p>
                                        <p className="text-xs text-gray-400">Clean white interface</p>
                                    </div>
                                </div>
                                {!darkMode && <CheckIcon className="w-5 h-5 text-green-700" />}
                            </button>

                            {/* Dark */}
                            <button
                                onClick={() => { if (!darkMode) toggleDark() }}
                                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl border-2 transition-all duration-200
                                    ${darkMode ? 'border-green-700 bg-green-50' : 'border-gray-100 hover:border-gray-200'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-700 shadow-sm flex items-center justify-center">
                                        <MoonIcon className="w-5 h-5 text-indigo-300" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-gray-800">Dark Mode</p>
                                        <p className="text-xs text-gray-400">Easy on the eyes at night</p>
                                    </div>
                                </div>
                                {darkMode && <CheckIcon className="w-5 h-5 text-green-700" />}
                            </button>
                        </div>
                    )}

                    {/* ── Profile Tab ── */}
                    {tab === 'profile' && (
                        <div className="flex flex-col gap-5">

                            {/* Avatar */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="relative">
                                    {avatar
                                        ? <img src={avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover border-4 border-green-100 shadow-md" />
                                        : <div className="w-20 h-20 rounded-full bg-green-900 flex items-center justify-center text-white text-2xl font-bold border-4 border-green-100 shadow-md">
                                            {initials}
                                          </div>
                                    }
                                    <button
                                        onClick={() => avatarRef.current?.click()}
                                        className="absolute bottom-0 right-0 w-7 h-7 bg-green-900 hover:bg-green-700 rounded-full flex items-center justify-center shadow-md transition-colors"
                                    >
                                        <CameraIcon className="w-3.5 h-3.5 text-white" />
                                    </button>
                                    <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
                                </div>
                                <p className="text-xs text-gray-400">Click the camera to change your photo</p>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="text-xs font-semibold text-green-900 uppercase tracking-wider block mb-1.5">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Your name"
                                    className="w-full border border-gray-200 bg-green-50 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 transition-all"
                                />
                            </div>

                            {/* Email — read only */}
                            <div>
                                <label className="text-xs font-semibold text-green-900 uppercase tracking-wider block mb-1.5">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    value={user.email || ''}
                                    readOnly
                                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed"
                                />
                            </div>

                            {/* Save */}
                            <button
                                onClick={handleSaveProfile}
                                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                                    ${saved
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-green-900 hover:bg-green-700 text-white shadow-sm hover:shadow-md'
                                    }`}
                            >
                                {saved ? <><CheckIcon className="w-4 h-4" /> Saved!</> : 'Save Changes'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

/* ── Main Nav ── */
export const DashboardNav = () => {
    const [menuOpen,      setMenuOpen]      = useState(false)
    const [profileOpen,   setProfileOpen]   = useState(false)
    const [settingsOpen,  setSettingsOpen]  = useState(false)
    const [query,         setQuery]         = useState('')
    const [showDrop,      setShowDrop]      = useState(false)
    const [darkMode,      setDarkMode]      = useState(() => {
        const saved = localStorage.getItem('darkMode')
        return saved === '1'
    })

    const navigate     = useNavigate()
    const { pathname } = useLocation()
    const profileRef   = useRef(null)
    const searchRef    = useRef(null)

    const isActive = (path) => pathname === path

    const user        = JSON.parse(localStorage.getItem('user')) || {}
    const displayName = user.username || 'Traveler'
    const initials    = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    const avatar      = user.avatar || null

    // apply dark mode on mount and whenever it changes
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode)
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease'
    }, [darkMode])

    const results = query.trim().length > 0
        ? ALL_PLACES.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.location.toLowerCase().includes(query.toLowerCase()) ||
            p.badge.toLowerCase().includes(query.toLowerCase())
          )
        : []

    useEffect(() => {
        const handler = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
            if (searchRef.current && !searchRef.current.contains(e.target)) setShowDrop(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    const goToPlace = (name) => {
        setQuery(''); setShowDrop(false)
        navigate(`/explore?place=${encodeURIComponent(name)}`)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setShowDrop(false)
            if (results.length === 1) goToPlace(results[0].name)
            else if (query.trim()) { setQuery(''); navigate(`/explore?q=${encodeURIComponent(query.trim())}`) }
        }
        if (e.key === 'Escape') { setShowDrop(false); setQuery('') }
    }

    const AvatarCircle = ({ size = 'sm' }) => {
        const cls = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'
        return avatar
            ? <img src={avatar} alt="avatar" className={`${cls} rounded-full object-cover shrink-0`} />
            : <div className={`${cls} rounded-full bg-green-900 flex items-center justify-center text-white font-bold shrink-0`}>{initials}</div>
    }

    const SearchDropdown = () => (
        results.length > 0 && showDrop ? (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
                {results.map((place, i) => (
                    <button
                        key={i}
                        onMouseDown={() => goToPlace(place.name)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors duration-150 text-left border-b border-gray-50 last:border-0"
                    >
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                            <MapPinIcon className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">{place.name}</p>
                            <p className="text-xs text-gray-400 truncate">{place.location}</p>
                        </div>
                        <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full shrink-0 ml-auto">
                            {place.badge}
                        </span>
                    </button>
                ))}
            </div>
        ) : null
    )

    return (
        <>
            {settingsOpen && (
                <SettingsModal
                    onClose={() => setSettingsOpen(false)}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />
            )}

            <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between gap-4">

                    {/* Logo */}
                    <h1 className="text-xl font-extrabold text-green-900 shrink-0">
                        Ask<span className="text-emerald-500">Baguio</span>
                    </h1>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center gap-1">
                        {NAV_LINKS.map(({ label, path }) => (
                            <button
                                key={label}
                                onClick={() => navigate(path)}
                                className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200
                                    after:content-[''] after:absolute after:bottom-1 after:left-4 after:h-0.5 after:bg-green-700
                                    after:transition-all after:duration-300
                                    ${isActive(path)
                                        ? 'text-green-900 after:w-[calc(100%-2rem)]'
                                        : 'text-gray-500 hover:text-green-900 hover:bg-green-50 after:w-0 hover:after:w-[calc(100%-2rem)]'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Desktop Right */}
                    <div className="hidden lg:flex items-center gap-3">

                        {/* Search */}
                        <div ref={searchRef} className="relative">
                            <div className="flex items-center gap-2 bg-green-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-green-700 transition-all">
                                <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 shrink-0" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={e => { setQuery(e.target.value); setShowDrop(true) }}
                                    onFocus={() => setShowDrop(true)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search spots..."
                                    className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-44 focus:w-56 transition-all duration-300"
                                />
                                {query && (
                                    <button onClick={() => { setQuery(''); setShowDrop(false) }}>
                                        <XMarkIcon className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                                    </button>
                                )}
                            </div>
                            <SearchDropdown />
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button
                                onClick={() => setProfileOpen(p => !p)}
                                className="flex items-center gap-2 bg-green-50 hover:bg-green-100 border border-gray-200 rounded-xl px-2.5 py-1.5 transition-all duration-200"
                            >
                                <AvatarCircle size="sm" />
                                <span className="text-sm font-semibold text-green-900 max-w-24 truncate">{displayName}</span>
                                <ChevronDownIcon className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden z-50">
                                    <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                                        <AvatarCircle size="lg" />
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-gray-800 truncate">{displayName}</p>
                                            <p className="text-xs text-gray-400 truncate">{user.email || 'traveler@baguio.com'}</p>
                                        </div>
                                    </div>
                                    <div className="py-1">
                                        <button
                                            onClick={() => { setProfileOpen(false); setSettingsOpen(true) }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-green-50 hover:text-green-900 transition-colors duration-150"
                                        >
                                            <Cog6ToothIcon className="w-4 h-4 text-gray-400" />
                                            Settings
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-50 transition-colors duration-150"
                                        >
                                            <ArrowRightOnRectangleIcon className="w-4 h-4 text-rose-400" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="flex lg:hidden items-center gap-2">
                        <button
                            onClick={() => setMenuOpen(prev => !prev)}
                            className="p-2 rounded-xl text-gray-600 hover:text-green-900 hover:bg-green-50 transition-all duration-200"
                        >
                            {menuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-screen border-t border-gray-100' : 'max-h-0'}`}>
                    <div className="px-5 py-4 flex flex-col gap-1 bg-white">

                        {/* Mobile User Info */}
                        <div className="flex items-center gap-3 px-4 py-3 mb-1 bg-green-50 rounded-xl">
                            <AvatarCircle size="lg" />
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate">{displayName}</p>
                                <p className="text-xs text-gray-400 truncate">{user.email || 'traveler@baguio.com'}</p>
                            </div>
                        </div>

                        {/* Mobile Search */}
                        <div ref={searchRef} className="relative mb-1">
                            <div className="flex items-center gap-2 bg-green-50 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-green-700 transition-all">
                                <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 shrink-0" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={e => { setQuery(e.target.value); setShowDrop(true) }}
                                    onFocus={() => setShowDrop(true)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search spots..."
                                    className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                                />
                                {query && (
                                    <button onClick={() => { setQuery(''); setShowDrop(false) }}>
                                        <XMarkIcon className="w-3.5 h-3.5 text-gray-400" />
                                    </button>
                                )}
                            </div>
                            <SearchDropdown />
                        </div>

                        {/* Mobile Nav Links */}
                        {NAV_LINKS.map(({ label, path }) => (
                            <button
                                key={label}
                                onClick={() => { navigate(path); setMenuOpen(false) }}
                                className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                                    ${isActive(path)
                                        ? 'bg-green-900 text-white'
                                        : 'text-gray-600 hover:bg-green-50 hover:text-green-900'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}

                        {/* Mobile Settings + Logout */}
                        <div className="border-t border-gray-100 mt-1 pt-1">
                            <button
                                onClick={() => { setMenuOpen(false); setSettingsOpen(true) }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-green-50 hover:text-green-900 transition-colors duration-150"
                            >
                                <Cog6ToothIcon className="w-4 h-4 text-gray-400" />
                                Settings
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-rose-500 hover:bg-rose-50 transition-colors duration-150"
                            >
                                <ArrowRightOnRectangleIcon className="w-4 h-4 text-rose-400" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
