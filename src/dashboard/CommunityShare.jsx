import { useState, useRef, useEffect } from 'react'
import { PhotoIcon, MapPinIcon, PaperAirplaneIcon, XMarkIcon, UserGroupIcon } from '@heroicons/react/24/solid'

/* ── Inject styles once ── */
const STYLES = `
  :root { --c-ease: cubic-bezier(0.25, 0.1, 0.25, 1); }

  /* Page entrance */
  @keyframes c-fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes c-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes c-scaleIn {
    from { opacity: 0; transform: scale(0.97) translateY(6px); }
    to   { opacity: 1; transform: scale(1)    translateY(0); }
  }

  .c-fade-up   { animation: c-fadeUp  0.38s var(--c-ease) both; }
  .c-fade-in   { animation: c-fadeIn  0.3s  var(--c-ease) both; }
  .c-scale-in  { animation: c-scaleIn 0.32s var(--c-ease) both; }

  /* Stagger */
  .c-stagger > *:nth-child(1) { animation-delay: 0.04s; }
  .c-stagger > *:nth-child(2) { animation-delay: 0.09s; }
  .c-stagger > *:nth-child(3) { animation-delay: 0.14s; }
  .c-stagger > *:nth-child(4) { animation-delay: 0.19s; }
  .c-stagger > *:nth-child(5) { animation-delay: 0.24s; }

  /* Composer card */
  .composer-card {
    transition: box-shadow 0.25s var(--c-ease);
  }
  .composer-card:focus-within {
    box-shadow: 0 8px 24px -6px rgba(0,0,0,0.08);
  }

  /* Textarea */
  .c-textarea {
    transition: border-color 0.2s var(--c-ease),
                box-shadow   0.2s var(--c-ease),
                background   0.2s var(--c-ease);
  }

  /* Location row slide in */
  @keyframes c-slideDown {
    from { opacity: 0; transform: translateY(-6px); max-height: 0; }
    to   { opacity: 1; transform: translateY(0);    max-height: 60px; }
  }
  .location-enter { animation: c-slideDown 0.22s var(--c-ease) both; }

  /* Image preview */
  @keyframes c-imgIn {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1); }
  }
  .img-preview-enter { animation: c-imgIn 0.25s var(--c-ease) both; }

  /* Clear image button */
  .clear-btn {
    transition: background-color 0.15s var(--c-ease),
                transform        0.15s var(--c-ease);
  }
  .clear-btn:hover { transform: scale(1.1); }

  /* Toolbar buttons */
  .toolbar-btn {
    transition: background-color 0.18s var(--c-ease),
                color            0.18s var(--c-ease);
  }

  /* Post button */
  .post-btn {
    transition: background-color 0.2s var(--c-ease),
                box-shadow       0.2s var(--c-ease),
                opacity          0.2s var(--c-ease),
                transform        0.15s var(--c-ease);
  }
  .post-btn:not(:disabled):hover {
    box-shadow: 0 4px 14px -3px rgba(20,83,45,0.35);
  }
  .post-btn:not(:disabled):active { transform: scale(0.97); }

  /* Feed cards */
  .feed-card {
    transition: box-shadow 0.22s var(--c-ease),
                transform  0.22s var(--c-ease);
  }
  .feed-card:hover {
    box-shadow: 0 8px 24px -6px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }

  /* Search / location input focus ring */
  .c-input-wrap {
    transition: box-shadow 0.2s var(--c-ease), border-color 0.2s var(--c-ease);
  }
  .c-input-wrap:focus-within {
    box-shadow: 0 0 0 2px rgba(21,128,61,0.25);
    border-color: #15803d;
  }

  /* Members badge */
  .members-badge {
    transition: background-color 0.2s var(--c-ease);
  }
`

export const injectCommunityStyles =() =>{
  if (typeof document === 'undefined') return
  if (document.getElementById('community-transitions')) return
  const el = document.createElement('style')
  el.id = 'community-transitions'
  el.textContent = STYLES
  document.head.appendChild(el)
}

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
        injectCommunityStyles()
        const fetchCommunityStats = async () => {
            try {
                const res  = await fetch('/api/community-stats')
                const data = await res.json()
                console.log("STATUS:", res.status)
                console.log("COMMUNITY DATA:", data)
                if (res.ok) setTotalMembers(data.totalMembers)
                else console.log("API error:", data.error)
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
            <div className="flex items-center justify-between mb-4 c-fade-up">
                <div>
                    <h2 className="text-gray-800 font-bold text-lg">Your Posts</h2>
                    <p className="text-gray-400 text-sm">Share your Baguio finds, reviews, and hidden gems.</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full members-badge">
                    <UserGroupIcon className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-700">{formatMembers(totalMembers)} members</span>
                </div>
            </div>

            {/* Composer Card */}
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5 composer-card c-fade-up" style={{ animationDelay: '0.06s' }}>

                {/* Top row */}
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
                            className="w-full resize-none bg-green-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 leading-relaxed c-textarea"
                        />

                        {/* Character counter */}
                        <p className={`text-xs text-right pr-1 transition-colors duration-200 ${postText.length >= 450 ? 'text-rose-400' : 'text-gray-400'}`}>
                            {postText.length}/500
                        </p>

                        {/* Image preview */}
                        {imagePreview && (
                            <div className="relative w-fit img-preview-enter">
                                <img src={imagePreview} alt="preview" className="h-40 rounded-2xl object-cover border border-gray-100 shadow-sm" />
                                <button
                                    onClick={clearImage}
                                    className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center clear-btn"
                                >
                                    <XMarkIcon className="w-3.5 h-3.5 text-white" />
                                </button>
                            </div>
                        )}

                        {/* Location input */}
                        {showLocation && (
                            <div className="flex items-center gap-2 bg-green-50 border border-gray-200 rounded-xl px-3 py-2 c-input-wrap location-enter">
                                <MapPinIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                                <input
                                    type="text"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    placeholder="Add a location (e.g. Burnham Park)"
                                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                                />
                                {location && (
                                    <button onClick={() => setLocation('')} className="transition-opacity duration-150 hover:opacity-70">
                                        <XMarkIcon className="w-3.5 h-3.5 text-gray-400" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">

                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
                        <button
                            onClick={() => fileRef.current?.click()}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold toolbar-btn
                                ${imagePreview ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-green-50 hover:text-green-800'}`}
                        >
                            <PhotoIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">Photo</span>
                        </button>

                        <button
                            onClick={() => setShowLocation(p => !p)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold toolbar-btn
                                ${showLocation ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-green-50 hover:text-green-800'}`}
                        >
                            <MapPinIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">Location</span>
                        </button>
                    </div>

                    <button
                        onClick={handlePost}
                        disabled={!canPost}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold post-btn
                            ${canPost
                                ? 'bg-green-900 hover:bg-green-700 text-white shadow-sm'
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
                <div className="flex flex-col gap-4 mt-5 c-stagger">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5 feed-card c-scale-in">
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
