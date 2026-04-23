import { NavBar } from "./components/nav";
import { HeroSection } from "./components/HeroSection";
import { FeaturedSpots } from "./components/FeaturedTouristSpots";
import { AboutSection } from "./components/aboutSection.jsx";
import { HowitWorks } from "./components/howItWorks.jsx";
import { CalltoAction } from "./components/calltoAction.jsx";
import { Footer } from "./components/footer.jsx";
import BubbleMenu from "./utilities/BubbleMenu.jsx";
import { useRef,useEffect } from "react";



function App(){
  //para sa fade effect 
  useEffect(()=>{
    const hiddenElements = document.getElementsByClassName("hiddenEl")

    const observer =  new IntersectionObserver((entries) =>{
      entries.forEach((entry) =>{
        if(entry.isIntersecting){
          entry.target.classList.add("show")
        }else{
          entry.target.classList.remove("show")
        }
      })
    })
    Array.from(hiddenElements).forEach((el) => {
      observer.observe(el)
    })
    return () => observer.disconnect()
  },[])
  const items = [
              {
              label: 'For You',
              href: '#',
              ariaLabel: 'For You',
              rotation: -8,
              hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
              },
              {
              label: 'about',
              href: '#',
              ariaLabel: 'About',
              rotation: 8,
              hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
              },
              {
              label: 'Sign Up',
              href: '#',
              ariaLabel: 'Projects',
              rotation: 8,
              hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
              }
              ];
  return <div className="bg-green-50">
    <NavBar />
    <div className='sm:hidden' >                         
                     <BubbleMenu
                     logo={<span style={{ fontWeight: 700, color:"green" }}>Ask Baguio</span>}
                     items={items}
                     menuAriaLabel="Toggle navigation"
                     menuBg="#ffffff"
                     menuContentColor="#111111"
                     useFixedPosition={true}
                     animationEase="back.out(1.5)"
                     animationDuration={0.5}
                     staggerDelay={0.12}

                     />
      </div>
   <HeroSection />
    <div className="hiddenEl"><FeaturedSpots /></div>
    <div className="hiddenEl"><AboutSection /></div>
    <div className="hiddenEl"><HowitWorks  /></div>
    <div className="hiddenEl"><CalltoAction  /></div>
    <div className="hiddenEl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="block w-full -mb-0.5"
      >
        <path
          fill="#32612D"
          fillOpacity="1"
          d="M0,0L20,5.3C40,11,80,21,120,37.3C160,53,200,75,240,80C280,85,320,75,360,64C400,53,440,43,480,48C520,53,560,75,600,96C640,117,680,139,720,154.7C760,171,800,181,840,192C880,203,920,213,960,192C1000,171,1040,117,1080,112C1120,107,1160,149,1200,149.3C1240,149,1280,107,1320,96C1360,85,1400,107,1420,117.3L1440,128L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
        />
    </svg>

  <Footer />
</div>
  </div>
}

export default App;