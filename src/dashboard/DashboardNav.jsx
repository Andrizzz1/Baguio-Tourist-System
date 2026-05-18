import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon, ChevronDownIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { useNavigate, useLocation } from 'react-router-dom';
import { ALL_PLACES } from '../data/places';

const NAV_LINKS = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Explore',   path: '/explore'   },
    { label: 'Community', path: '/Community' },
    { label: 'Saved',     path: '/saved'     },
]

export const DashboardNav = () => {
    const [menuOpen,     setMenuOpen]     = useState(false)
    const [profileOpen,  setProfileOpen]  = useState(false)
    const [query,        setQuery]        = useState('')
    const [showDrop,     setShowDrop]     = useState(false)

    const navigate      = useNavigate()
    const { pathname }  = useLocation()
    const profileRef    = useRef(null)
    const searchRef     = useRef(null)

    const isActive = (path) => pathname === path

    const user        = JSON.parse(localStorage.getItem('user'))
    const displayName = user?.username || 'Traveler'
    const initials    = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

    const results = query.trim().length > 0
        ? ALL_PLACES.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.location.toLowerCase().includes(query.toLowerCase()) ||
            p.badge.toLowerCase().includes(query.toLowerCase())
          )
        : []

    // close profile dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target))
                setProfileOpen(false)
            if (searchRef.current && !searchRef.current.contains(e.target))
                setShowDrop(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    const goToPlace = (name) => {
        setQuery('')
        setShowDrop(false)
        navigate(`/explore?place=${encodeURIComponent(name)}`)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setShowDrop(false)
            if (results.length === 1) {
                goToPlace(results[0].name)
            } else if (query.trim()) {
                setQuery('')
                navigate(`/explore?q=${encodeURIComponent(query.trim())}`)
            }
        }
        if (e.key === 'Escape') { setShowDrop(false); setQuery('') }
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

                {/* Desktop Right — Search + Profile */}
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
                            <div className="w-7 h-7 rounded-full bg-green-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                {initials}
                            </div>
                            <span className="text-sm font-semibold text-green-900 max-w-24 truncate">{displayName}</span>
                            <ChevronDownIcon className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden z-50">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-semibold text-gray-800 truncate">{displayName}</p>
                                    <p className="text-xs text-gray-400 truncate">{user?.email || 'traveler@baguio.com'}</p>
                                </div>
                                <div className="py-1">
                                    <button
                                        onClick={() => { setProfileOpen(false); navigate('/settings') }}
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

                {/* Mobile Right — Hamburger */}
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
                        <div className="w-9 h-9 rounded-full bg-green-900 flex items-center justify-center text-white text-sm font-bold shrink-0">
                            {initials}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">{displayName}</p>
                            <p className="text-xs text-gray-400 truncate">{user?.email || 'traveler@baguio.com'}</p>
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
                            onClick={() => { navigate('/settings'); setMenuOpen(false) }}
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
    )
}
