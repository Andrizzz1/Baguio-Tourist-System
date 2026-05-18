import { useState, useRef, useEffect } from 'react'
import { DashboardNav } from '../dashboard/DashboardNav'
import {
    PhotoIcon, MapPinIcon, PaperAirplaneIcon,
    XMarkIcon, UserGroupIcon, SparklesIcon, TrashIcon
} from '@heroicons/react/24/solid'
import { injectCommunityStyles } from '../dashboard/CommunityShare'



export const Community = () => {
    const user        = JSON.parse(localStorage.getItem('user'))
    const displayName = user?.username || 'Traveler'
    const initials    = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    const [contributors, setContributors] = useState([])
    const [posts, setPosts] = useState([])
    const [postText,     setPostText]     = useState('')
    const [location,     setLocation]     = useState('')
    const [showLocation, setShowLocation] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageBase64,  setImageBase64]  = useState(null)
    const [totalMembers, setTotalMembers] = useState(0)
    const fileRef = useRef(null)
    const [trends,setTrends] = useState([])
    const formatMembers = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n

   
    const fetchPosts = async () => {
    try {
        const res = await fetch("/api/community-posts");
        const data = await res.json();

        if (res.ok) {
            setPosts(data);
        } else {
            console.log(data.error);
        }
    } catch (error) {
        console.log(error);
    }
};
    useEffect(() => {
    fetchPosts();
    }, []);
    

    useEffect(()=>{
    const Trending = async ()=>{
        try{
                const res = await fetch("/api/community-trends");
                const data = await res.json();
                if (res.ok && Array.isArray(data)) {
                    setTrends(data);
                } else {
                    setTrends([]);
                    console.log(err);
                }
            }catch(err){
                setTrends([]);
                console.log(data.error || "Invalid trends data");
            }
        }
        Trending()
    },[])

    useEffect(()=>{
        const TopContributors = async ()=>{
            try{
                const res = await fetch('/api/top-contributers')
                const data = await res.json()

                  if (res.ok) {
                    setContributors(data);
                } else {
                    console.log(data.error);
                }
            }catch(err){
                console.log(err)
            }
        }

        TopContributors()
    },[])
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

    const handlePost = async () => {
    if (!postText.trim() && !imageBase64 && !location.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Please login first.");
        return;
    }

    const userId = user.id || user.users_id;

    if (!userId) {
        console.log("User in localStorage:", user);
        alert("User ID missing. Please log out and log in again.");
        return;
    }

    try {
        const res = await fetch("/api/community-posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: userId,
                content: postText,
                location: location || "Baguio City",
                image_url: imageBase64 || null
            })
        });

        const data = await res.json();

        console.log("POST status:", res.status);
        console.log("POST response:", data);

        if (res.ok) {
            setPostText("");
            setLocation("");
            setShowLocation(false);
            clearImage();
            fetchPosts();
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.log("Post error:", error);
    }
};

    const canPost =
    postText.trim().length > 0 ||
    imageBase64 !== null ||
    location.trim().length > 0


    return (
        <section className="min-h-screen bg-gray-50">
            <DashboardNav />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

                {/* Page header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Community</h1>
                        <p className="text-gray-400 text-sm mt-0.5">Share your Baguio finds, reviews, and hidden gems.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full w-fit">
                        <UserGroupIcon className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-700">
                            {formatMembers(totalMembers)} members
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6 max-sm:flex max-sm:flex-wrap max-sm:flex-col-reverse ">

                    {/* ── LEFT — Composer + Feed ── */}
                    <div className="flex flex-col gap-5">

                        {/* Composer */}
                        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5">
                                    {initials}
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <textarea
                                        value={postText}
                                        onChange={e => setPostText(e.target.value.slice(0, 500))}
                                        placeholder="Share an experience..."
                                        rows={3}
                                        className="w-full resize-none bg-green-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 transition-all leading-relaxed"
                                    />

                                    {/* Char counter */}
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

                            {/* Toolbar */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-1">
                                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
                                    <button
                                        onClick={() => fileRef.current?.click()}
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200
                                            ${imagePreview ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-green-50 hover:text-green-800'}`}
                                    >
                                        <PhotoIcon className="w-4 h-4" />
                                        <span className="hidden sm:inline">Photo</span>
                                    </button>

                                    <button
                                        onClick={() => setShowLocation(p => !p)}
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200
                                            ${showLocation ? 'bg-emerald-100 text-emerald-700' : 'text-gray-500 hover:bg-green-50 hover:text-green-800'}`}
                                    >
                                        <MapPinIcon className="w-4 h-4" />
                                        <span className="hidden sm:inline">Location</span>
                                    </button>
                                </div>

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
                        <div className="flex flex-col gap-4">
                            {posts.map(post => {
                                const postInitials = post.username
                                ? post.username.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                                : 'U'
                                
                                return (
                                <div key={post.post_id} className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-9 h-9 rounded-full bg-green-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                            {postInitials }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-800">{post.username}</p>
                                            <p className="text-xs text-gray-400">@{post.email?.split('@')[0]} · {new Date(post.created_at).toLocaleString()}</p>
                                        </div>
                                        <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full font-medium shrink-0">
                                            Community Post
                                        </span>
                                    </div>

                                    {post.content && (
                                        <p className="text-sm text-gray-700 leading-relaxed mb-3">{post.content}</p>
                                    )}

                                    {post.image_url && (
                                        <img src={post.image_url} alt="post" className="w-full max-h-72 object-cover rounded-2xl mb-3 border border-gray-100" />
                                    )}

                                    <div className="flex items-center gap-1 text-xs text-gray-400">
                                        <MapPinIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                        {post.location}
                                    </div>
                                </div>
                            )})}
                        </div>
                    </div>

                    {/* ── RIGHT — Sidebar ── */}
                    <div className="flex flex-col gap-5">

                        {/* Trending */}
                        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                    <SparklesIcon className="w-4 h-4 text-emerald-600" />
                                </div>
                                <h3 className="font-bold text-gray-800 text-sm">Trending in Baguio</h3>
                            </div>
                            <div className="flex flex-col gap-3">
                                {trends.map((t) => (
                                    <div key={t.tag} className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-green-900">{t.tag}</span>
                                        <span className="text-xs text-gray-400">{t.count} posts</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Contributors */}
                        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                    <UserGroupIcon className="w-4 h-4 text-emerald-600" />
                                </div>
                                <h3 className="font-bold text-gray-800 text-sm">Top Contributors</h3>
                            </div>
                            <div className="flex flex-col gap-4">
                                {contributors.map((c) => {
                                    const contributorInitials = c.username
                                    ? c.username.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                                    : 'U'
                                return(
                                    <div key={c.users_id} className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                {contributorInitials}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-gray-800 truncate">{c.username}</p>
                                                <p className="text-xs text-gray-400">{c.total_post} posts</p>
                                            </div>
                                        </div>
                                        <button className="text-xs font-semibold text-green-900 border border-green-200 hover:bg-green-50 px-3 py-1.5 rounded-full transition-colors duration-200 shrink-0">
                                            Follow
                                        </button>
                                    </div>
                                )})}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}