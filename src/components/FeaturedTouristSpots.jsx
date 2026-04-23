import MagicBento from '../utilities/MagicBento.jsx';

export const FeaturedSpots = ()=>{
    return <section className="text-center mt-10 flex flex-col items-center ">
        <h2 className="font-bold text-2xl text-green-900">Discover Tourist Spots</h2>
        <p className="mt-2 text-gray-500">Start your journey with Baguio’s most loved destinations.</p>
        <MagicBento 
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="74, 222, 128"
            disableAnimations={false}
            />
    </section>
}