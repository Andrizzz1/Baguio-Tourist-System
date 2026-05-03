import { useState, useRef, useEffect } from 'react'
import { PhotoIcon, MapPinIcon, PaperAirplaneIcon, XMarkIcon, UserGroupIcon } from '@heroicons/react/24/solid'

export const ShareToCommunity = () => {
    const [totalMembers, setTotalMembers] = useState(0)
    const [postText, setPostText]         = useState('')
    const [location, setLocation]         = useState('')
    const [showLocation, setShowLocation] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageBase64, setImageBase64]   = useState(null)
    const [posts, setPosts]               = useState(() => {
        try { return JSON.parse(localStorage.getItem('communityPosts')) || [] }
        catch { return [] }
    })
    const fileRef = useRef(null)

    const user        = JSON.parse(localStorage.getItem('user'))
    const displayName = user?.username || 'Traveler'
    const initials    = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

    const formatMembers = (count) => count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count

    useEffect(() => {
        const fetchCommunityStats = async () => {
            try {
                const res = await fetch('/api/community-stats')
                const data = await res.json()

                console.log("STATUS:", res.status)
                console.log("COMMUNITY DATA:", data)

                if (res.ok) {
                    setTotalMembers(data.totalMembers)
                } else {
                    console.log("API error:", data.error)
                }
            } catch (error) {
                console.log("Fetch error:", error)
            }
        }

        fetchCommunityStats()
    }, [])

    const handleImage = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result)
            setImageBase64(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const clearImage = () => {
        setImagePreview(null)
        setImageBase64(null)
        if (fileRef.current) fileRef.current.value = ''
    }

    const handlePost = () => {
        if (!postText.trim() && !imageBase64) return
        const newPost = {
            id:        Date.now(),
            author:    displayName,
            username:  user?.email?.split('@')[0] || 'traveler',
            initials,
            content:   postText,
            location:  location || 'Baguio City',
            image:     imageBase64,
            category:  'Community Post',
            createdAt: 'Just now',
            likes:     0,
            comments:  0,
        }
        const updated = [newPost, ...posts]
        setPosts(updated)
        localStorage.setItem('communityPosts', JSON.stringify(updated))
        setPostText('')
        setLocation('')
        setShowLocation(false)
        clearImage()
    }

    const canPost = postText.trim().length > 0 || imageBase64 !== null

    return (
        <section className="px-5 max-w-7xl mx-auto mt-5 pb-10">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-gray-800 font-bold text-lg">Community</h2>
                    <p className="text-gray-400 text-sm">Share your Baguio finds, reviews, and hidden gems.</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                    <UserGroupIcon className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-700">{formatMembers(totalMembers)} members</span>
                </div>
            </div>

            {/* Composer Card */}
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5">

                {/* Top row — avatar + textarea */}
                <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5">
                        {initials}
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                        <textarea
                            value={postText}
                            onChange={e => setPostText(e.target.value.slice(0, 500))}
                            placeholder="Share an experience, review a spot, or recommend a hidden gem..."
                            rows={3}
                            className="w-full resize-none bg-green-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 transition-all leading-relaxed"
                        />

                        {/* Character counter */}
                        <p className={`text-xs text-right pr-1 ${postText.length >= 450 ? 'text-rose-400' : 'text-gray-400'}`}>
                            {postText.length}/500
                        </p>

                        {/* Image preview */}
                        {imagePreview && (
                            <div className="relative w-fit">
                                <img src={imagePreview} alt="preview" className="h-40 rounded-2xl object-cover border border-gray-100 shadow-sm" />
                                <button
                                    onClick={clearImage}
                                    className="absolute top-2 right-2 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                                >
                                    <XMarkIcon className="w-3.5 h-3.5 text-white" />
                                </button>
                            </div>
                        )}

                        {/* Location input */}
                        {showLocation && (
                            <div className="flex items-center gap-2 bg-green-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-green-700 transition-all">
                                <MapPinIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                                <input
                                    type="text"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    placeholder="Add a location (e.g. Burnham Park)"
                                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                                />
                                {location && (
                                    <button onClick={() => setLocation('')}>
                                        <XMarkIcon className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom row — actions + post button */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">

                        {/* Photo upload */}
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
                        <button
                            onClick={() => fileRef.current?.click()}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200
                                ${imagePreview ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-green-50 hover:text-green-800'}`}
                        >
                            <PhotoIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">Photo</span>
                        </button>

                        {/* Location toggle */}
                        <button
                            onClick={() => setShowLocation(p => !p)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200
                                ${showLocation ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-green-50 hover:text-green-800'}`}
                        >
                            <MapPinIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">Location</span>
                        </button>
                    </div>

                    {/* Post button */}
                    <button
                        onClick={handlePost}
                        disabled={!canPost}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                            ${canPost
                                ? 'bg-green-900 hover:bg-green-700 text-white shadow-sm hover:shadow-md'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <PaperAirplaneIcon className="w-4 h-4" />
                        Post
                    </button>
                </div>
            </div>

            {/* Feed */}
            {posts.length > 0 && (
                <div className="flex flex-col gap-4 mt-5">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-full bg-green-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                    {post.initials}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800">{post.author}</p>
                                    <p className="text-xs text-gray-400">@{post.username} · {post.createdAt}</p>
                                </div>
                                <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full font-medium shrink-0">
                                    {post.category}
                                </span>
                            </div>

                            {post.content && <p className="text-sm text-gray-700 leading-relaxed mb-3">{post.content}</p>}

                            {post.image && (
                                <img src={post.image} alt="post" className="w-full max-h-72 object-cover rounded-2xl mb-3 border border-gray-100" />
                            )}

                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <MapPinIcon className="w-3.5 h-3.5 text-emerald-400" />
                                {post.location}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
