export const AboutSection = ()=>{
    return <section className="mt-20 flex flex-col items-center gap-3 text-center">
        <p className="text-gray-500">About the Platform</p>
        <h1 className="text-4xl font-semibold text-green-900">Your smarter way to explore Baguio</h1>
        <img className="w-3xl mt-4 shadow-lg rounded-2xl p-2" src="/imgs/About.png" alt="AboutPage" />
        <p className="text-gray-500 max-w-7/12 mt-4 ">We built this platform to help tourists explore Baguio City with ease. Users can discover famous destinations, learn the history of each place, ask questions through an AI chatbot, and read helpful reviews from the community. Our goal is to create a smarter and more interactive travel experience for every visitor.</p>
    </section>
}