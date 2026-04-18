import { TypeAnimation } from 'react-type-animation';

export const HeroSection = ()=>{
    return <section>
        <div className="h-[calc(100vh-80px)] bg-cover bg-center rounded-t-xl  bg-black/50 bg-blend-darken" 
             style={{backgroundImage:"url('/imgs/background.png')"}}>
                <div className='px-65 py-40 max-xl:px-40 max-lg:px-35 max-md:px-20 max-sm:px-5'>
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed out once, initially
                            'Explore Baguio, Smarter',
                            1000, // wait 1s before replacing "Mice" with "Hamsters"
                            'See More Than Just Places',
                            1000,
                            'See More Than Just Places',
                            1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ fontSize: '1em', display: 'inline-block',color:"oklch(87.2% 0.01 258.338)" }}
                        repeat={Infinity}
                        />
                    <h1 className='text-white font-bold text-7xl max-sm:text-4xl'>Navigating the <br /> City of Pines.</h1>
                    <p className='text-gray-400 mt-5 max-w-2xl'>Find where to go, know why it matters, and explore the city with real local insight and AI assistance</p>
                    <div className='flex  items-center mt-5 gap-5 max-w-xl'>
                        <a href="#" className='bg-white
                        text-green-900
                        py-2 w-34 
                        text-center px-5 
                        rounded-4xl
                        border-green-900
                        border-2
                        hover:bg-gray-300
                        hover:text-green-600
                        transition-all
                        duration-300
                        '>LOGIN</a>
                        <a href="#" className='hover:bg-green-600 duration-400 transition-all bg-green-900 text-white py-2 px-5 rounded-4xl'>CHAT WITH AI</a>
                    </div>
                </div>    
           
        </div>
        
    </section>
}