import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);
export const HowitWorks = ()=>{
    const lineRef = useRef(null);

      useEffect(() => {
        gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
            trigger: lineRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true  // ties animation to scroll position
            }
        }
        );
    }, []);
    return <section className="grid 
                               grid-cols-2 
                               max-sm:flex 
                               max-sm:flex-wrap  
                               max-sm:gap-10
                               min-h-[40vh] 
                               lg:h-[80vh] 
                               mt-10 
                               bg-green-100 
                               p-5 
                               gap-1" > 
    <div className="h-full bg-cover bg-center rounded-4xl max-sm:w-full " style={{backgroundImage:"url('/imgs/HowItWorks_bg.png')"}}>
        <div className="flex flex-col items-center gap-5 mt-20 max-sm:mt-5 p-1 max-sm:gap-2 max-sm:w-full">
            <h1 className="font-bold text-7xl max-sm:text-6xl text-center lg:mt-20 text-green-700">How it works</h1>
            <p className='text-gray-500 font-semibold'>Explore Baguio in three simple steps.</p>
        </div>
    </div>
    <div style={{ position: 'relative', padding: '2rem' }}>
      {/* The growing green line */}
      <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: '#e5e7eb' }}>
        <div ref={lineRef} style={{
          width: '100%',
          height: '100%',
          background: '#16a34a',
          transformOrigin: 'top center',
          scaleY: 0
        }} />
      </div>

      {/* Steps */}
      {[
        { title: 'Discover Places', desc: 'Browse tourist spots with interactive maps' },
        { title: 'Learn the History', desc: 'Read detailed background stories' },
        { title: 'Ask the AI Guide', desc: 'Get instant itinerary suggestions' },
      ].map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', paddingLeft: '3rem' }}>
          <div style={{
            position: 'absolute', left: '12px',
            width: '16px', height: '16px',
            borderRadius: '50%', background: '#16a34a',
            border: '2px solid white'
          }} />
          <div className='mt-5'>
            <h3 style={{ fontWeight: 700, fontSize: '1.5rem' ,color:'black'}}>{step.title}</h3>
            <p className='text-gray-500'>{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
    </section>
}