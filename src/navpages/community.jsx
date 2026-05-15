import { useState } from "react"
import { DashboardNav } from "../dashboard/DashboardNav"

export const Community = () => {

    // POSTS
    const [posts, setPosts] = useState([])

    // INPUT
    const [postText, setPostText] = useState("")

    // MEMBERS COUNT
    const membersCount = 12437

    // CREATE POST
    const handlePost = () => {

        if (!postText.trim()) return

        const newPost = {
            id: Date.now(),
            name: "You",
            initials: "YO",
            content: postText,
            posts: 1,
        }

        setPosts([newPost, ...posts])
        setPostText("")
    }

    // TOP CONTRIBUTORS
    const contributorsMap = {}

    posts.forEach((post) => {

        if (!contributorsMap[post.name]) {
            contributorsMap[post.name] = {
                name: post.name,
                initials: post.initials,
                count: 0,
            }
        }

        contributorsMap[post.name].count += 1
    })

    const topContributors = Object.values(contributorsMap)
        .sort((a, b) => b.count - a.count)

    // TRENDING TAGS
    const hashtags = {}

    posts.forEach((post) => {

        const words = post.content.split(" ")

        words.forEach((word) => {

            if (word.startsWith("#")) {

                if (!hashtags[word]) {
                    hashtags[word] = 0
                }

                hashtags[word] += 1
            }

        })

    })

    const trendingTopics = Object.entries(hashtags)
        .sort((a, b) => b[1] - a[1])

    return (

        <section className="min-h-screen bg-gray-100">

            <DashboardNav />

            <div className="max-w-7xl mx-auto px-6 py-8">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Header */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Community
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Share your Baguio finds, reviews, and hidden gems with fellow travelers.
                            </p>
                        </div>

                        {/* CREATE POST */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">

                            <div className="flex gap-4 items-start">

                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                                    YO
                                </div>

                                {/* Input */}
                                <div className="flex-1">

                                    <textarea
                                        value={postText}
                                        onChange={(e) => setPostText(e.target.value)}
                                        placeholder="Share an experience, review a spot, or recommend a hidden gem..."
                                        className="w-full h-32 resize-none rounded-2xl border border-gray-200 bg-gray-50 p-4 outline-none focus:ring-2 focus:ring-green-400"
                                        maxLength={500}
                                    />

                                    <div className="flex items-center justify-between mt-4">

                                        <div className="flex gap-6 text-gray-500">

                                            <button className="hover:text-green-600 transition">
                                                📷 Photo
                                            </button>

                                            <button className="hover:text-green-600 transition">
                                                📍 Location
                                            </button>

                                        </div>

                                        <div className="flex items-center gap-4">

                                            <span className="text-sm text-gray-400">
                                                {postText.length}/500
                                            </span>

                                            <button
                                                onClick={handlePost}
                                                className="bg-green-400 hover:bg-green-500 text-white px-5 py-2 rounded-full font-medium transition"
                                            >
                                                Post
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* POSTS */}
                        <div className="space-y-5">

                            {posts.length === 0 && (
                                <div className="bg-white rounded-3xl p-10 text-center text-gray-500 border border-gray-200">
                                    No community posts yet.
                                </div>
                            )}

                            {posts.map((post) => (

                                <div
                                    key={post.id}
                                    className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm"
                                >

                                    <div className="flex items-center gap-4 mb-4">

                                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                                            {post.initials}
                                        </div>

                                        <div>
                                            <h2 className="font-semibold text-gray-800">
                                                {post.name}
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                Shared a community post
                                            </p>
                                        </div>

                                    </div>

                                    <p className="text-gray-700 leading-relaxed">
                                        {post.content}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-6">

                        {/* MEMBERS */}
                        <div className="bg-green-100 text-green-800 rounded-full px-4 py-3 w-fit font-medium">
                            ✨ {membersCount.toLocaleString()} members
                        </div>

                        {/* TRENDING */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

                            <div className="flex items-center gap-3 mb-6">

                                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                    ↗
                                </div>

                                <h2 className="text-2xl font-bold text-gray-800">
                                    Trending in Baguio
                                </h2>

                            </div>

                            <div className="space-y-5">

                                {trendingTopics.length === 0 ? (

                                    <>
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-800">
                                                #BurnhamPark
                                            </h3>

                                            <p className="text-gray-500 text-sm">
                                                2.1k posts
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-800">
                                                #SessionRoad
                                            </h3>

                                            <p className="text-gray-500 text-sm">
                                                1.8k posts
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-800">
                                                #StrawberryTaho
                                            </h3>

                                            <p className="text-gray-500 text-sm">
                                                1.4k posts
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-800">
                                                #MinesViewPark
                                            </h3>

                                            <p className="text-gray-500 text-sm">
                                                982 posts
                                            </p>
                                        </div>
                                    </>

                                ) : (

                                    trendingTopics.map(([tag, count]) => (

                                        <div
                                            key={tag}
                                            className="flex items-center justify-between"
                                        >

                                            <h3 className="font-semibold text-gray-800">
                                                {tag}
                                            </h3>

                                            <p className="text-gray-500 text-sm">
                                                {count} posts
                                            </p>

                                        </div>

                                    ))

                                )}

                            </div>

                        </div>

                        {/* TOP CONTRIBUTORS */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Top contributors
                            </h2>

                            <div className="space-y-5">

                                {topContributors.length === 0 ? (

                                    <p className="text-gray-500">
                                        No contributors yet.
                                    </p>

                                ) : (

                                    topContributors.map((user) => (

                                        <div
                                            key={user.name}
                                            className="flex items-center justify-between"
                                        >

                                            <div className="flex items-center gap-4">

                                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                                                    {user.initials}
                                                </div>

                                                <div>

                                                    <h3 className="font-semibold text-gray-800">
                                                        {user.name}
                                                    </h3>

                                                    <p className="text-sm text-gray-500">
                                                        {user.count} posts this month
                                                    </p>

                                                </div>

                                            </div>

                                            <button className="border border-gray-300 px-5 py-2 rounded-full hover:bg-gray-100 transition">
                                                Follow
                                            </button>

                                        </div>

                                    ))

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}