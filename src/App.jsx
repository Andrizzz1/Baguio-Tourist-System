import { NavBar } from "./components/nav";
import { HeroSection } from "./components/HeroSection";
import { FeaturedSpots } from "./components/FeaturedTouristSpots";
import { AboutSection } from "./components/aboutSection.jsx";
import BubbleMenu from "./utilities/BubbleMenu.jsx"
function App(){
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
  return <div>
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
    <FeaturedSpots />
    <AboutSection />
  </div>
}

export default App;