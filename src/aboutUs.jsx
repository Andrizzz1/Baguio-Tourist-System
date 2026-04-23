import { NavBar } from "./components/nav"
import { useNavigate } from 'react-router-dom';
import TiltedCard from "./utilities/TiltedCard";
import BubbleMenu from "./utilities/BubbleMenu.jsx";
export const Aboutus = ()=>{
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
    function ProfileCard({imgSrc, Name,description, title}){
        return <div className="shadow-xl overflow-hidden text-center w-/12 p-1 bg-white rounded-2xl flex items-center flex-wrap justify-center mt-10 mx-5">
            <TiltedCard
            imageSrc={imgSrc}
            altText={Name}
            captionText={Name}
            containerHeight="300px"
            containerWidth="300px"
            imageHeight="300px"
            imageWidth="300px"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip
            displayOverlayContent
            overlayContent={
                <p className="text-white p-3 font-bold bg-black/50 bg-blend-darken rounded-2xl text-center">
                {Name}
                </p>
            }
            />
            <div>
                <h1 className="font-bold mt-3 text-2xl mb-2">{title}</h1>
                <p className=" text-gray-500 w-96">{description}</p>
            </div>
          
        </div>
    }
    return <section className="bg-green-50 ">
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
        <div className="pt-15 max-sm:pt-20 flex gap-5 justify-center flex-col text-center h-[calc(50vh-90px)]">
            <p className="text-gray-600 border-2 border-green-400 px-4 rounded-2xl bg-green-300 mx-auto">THE CREATORS</p>
            <h1 className="text-7xl font-bold max-sm:text-4xl ">Meet the Team <br /> 
                <span>Behind the Mist</span>
            </h1>
            <p className="w-96 mx-auto text-gray-600">We're just two students inspired by the cool breeze and pine-scented air of Baguio, building tools to help you discover the hidden gems of the Summer Capital.</p>
        </div>
        <div className="mt-20 flex flex-wrap justify-center gap-2">
            <ProfileCard 
            imgSrc='/imgs/Andrei.png' 
            description = 'Andrei is a Computer Engineering student from Baguio with skills in frontend and backend development. He works on the core logic of the Baguio Tourist System, helping build a smart, reliable, and user-friendly platform through React, JavaScript, Node.js, and web-based system development.'
            Name = 'John Andrei Mandapat' 
            title='Lead Developer'/>
            <ProfileCard 
            imgSrc='/imgs/tristan.jpg' 
            description = 'A Computer Engineering student and project collaborator who contributed to the visual direction of the Baguio Tourist System by suggesting fonts, helping source images, and supporting the overall design and content setup of the platform.'
            Name = 'Tristan Dela Cruz' 
            title='Design Collaborator'/>
        </div>
    </section>
}