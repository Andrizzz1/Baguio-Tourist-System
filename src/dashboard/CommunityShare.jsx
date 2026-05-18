import { useState, useRef, useEffect } from 'react'
import { PhotoIcon, MapPinIcon, PaperAirplaneIcon, XMarkIcon, UserGroupIcon, TrashIcon } from '@heroicons/react/24/solid'

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
    const user = JSON.parse(localStorage.getItem('user'))
    const displayName = user?.username || 'Traveler'
    const [totalMembers, setTotalMembers] = useState(0)
    const [postText, setPostText]         = useState('')
    const [location, setLocation]         = useState('')
    const [showLocation, setShowLocation] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageBase64, setImageBase64]   = useState(null)
    const [posts, setPosts]  = useState([])
    const fileRef = useRef(null)

  
    const initials    = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

    const formatMembers = (count) => count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count


    const fetchPosts = async ()=>{
        try{
            const res = await fetch(`/api/dasboard-post?userId=${user.id}`);
            const data = await res.json();

            if (res.ok) {
            setPosts(data);
            } else {
                console.log(data.error);
        }
        }catch(err){
            console.log(err)
        }
    };

    useEffect(()=>{
        fetchPosts();
    },[]);

const handleDeletePost = async (postId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id || user?.users_id;

    if (!userId) {
        alert("Please login first.");
        return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
        const res = await fetch(`/api/community-post-delete?postId=${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: userId
            })
        });

        const data = await res.json();

        if (res.ok) {
            await fetchPosts();
        } else {
            alert(data.error);
        }

        const confirmDelete = confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/delete-community-post?postId=${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: userId
                })
            });

            const data = await res.json();

            if (res.ok) {
                await fetchPosts();
            } else {
                alert(data.error);
            }
        } catch (err) {
            console.log("Delete post error:", err);
        }
    };

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

    return (
        <section className="px-5 max-w-7xl mx-auto mt-5 pb-10">

            {/* Header */}
            <div className="flex items-center justify-between mb-4 c-fade-up">
                <div>
                    <h2 className="text-gray-800 font-bold text-lg">Your Posts</h2>
                    <p className="text-gray-400 text-sm">Share your Baguio finds, reviews, and hidden gems on our Community.</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full members-badge">
                    <UserGroupIcon className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-700">{formatMembers(totalMembers)} members</span>
                </div>
            </div>

            {/* Feed */}
            {posts.length > 0 && (
                <div className="flex flex-col gap-4 mt-5 c-stagger">
                    {posts.map(post => {
                         const postInitials = post.username
                                ? post.username.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                                : 'U'

                        return(
                        <div key={post.post_id} className="bg-white border border-gray-100 rounded-3xl shadow-sm p-5 feed-card c-scale-in">
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
                                <button
                                    onClick={() => handleDeletePost(post.post_id)}
                                    className="p-1.5 rounded-xl text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition-all duration-200 shrink-0"
                                    title="Delete post"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>

                            {post.content && <p className="text-sm text-gray-700 leading-relaxed mb-3">{post.content}</p>}

                            {post.image_url && (
                                <img src={post.image_url} alt="post" className="w-full max-h-72 object-cover rounded-2xl mb-3 border border-gray-100" />
                            )}

                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <MapPinIcon className="w-3.5 h-3.5 text-emerald-400" />
                                {post.location}
                            </div>
                        </div>
                    )})}
                </div>
            )}
        </section>
    )
}
