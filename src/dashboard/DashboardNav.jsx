import { useState } from 'react'
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

const NAV_LINKS = ['Dashboard', 'Explore', 'Community', 'Saved']

export const DashboardNav = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [active, setActive] = useState('Dashboard')

    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between gap-4">

                {/* Logo */}
                <h1 className="text-xl font-extrabold text-green-900 shrink-0">
                    Ask<span className="text-emerald-500">Baguio</span>
                </h1>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map(link => (
                        <button
                            key={link}
                            onClick={() => setActive(link)}
                            className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200
                                after:content-[''] after:absolute after:bottom-1 after:left-4 after:h-0.5 after:bg-green-700
                                after:transition-all after:duration-300
                                ${active === link
                                    ? 'text-green-900 after:w-[calc(100%-2rem)]'
                                    : 'text-gray-500 hover:text-green-900 hover:bg-green-50 after:w-0 hover:after:w-[calc(100%-2rem)]'
                                }`}
                        >
                            {link}
                        </button>
                    ))}
                </div>

                {/* Desktop Right — Search */}
                <div className="hidden md:flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-green-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-green-700 transition-all">
                        <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search spots..."
                            className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-40 focus:w-52 transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Mobile Right — Hamburger */}
                <div className="flex md:hidden items-center gap-2">
                    <button
                        onClick={() => setMenuOpen(prev => !prev)}
                        className="p-2 rounded-xl text-gray-600 hover:text-green-900 hover:bg-green-50 transition-all duration-200"
                    >
                        {menuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 border-t border-gray-100' : 'max-h-0'}`}>
                <div className="px-5 py-4 flex flex-col gap-1 bg-white">

                    {/* Mobile Search */}
                    <div className="flex items-center gap-2 bg-green-50 border border-gray-200 rounded-xl px-3 py-2.5 mb-2 focus-within:ring-2 focus-within:ring-green-700 transition-all">
                        <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search spots..."
                            className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                        />
                    </div>

                    {/* Mobile Nav Links */}
                    {NAV_LINKS.map(link => (
                        <button
                            key={link}
                            onClick={() => { setActive(link); setMenuOpen(false) }}
                            className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                                ${active === link
                                    ? 'bg-green-900 text-white'
                                    : 'text-gray-600 hover:bg-green-50 hover:text-green-900'
                                }`}
                        >
                            {link}
                        </button>
                    ))}


                </div>
            </div>
        </nav>
    )
}
