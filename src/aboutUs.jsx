import { NavBar } from "./components/nav";
import TiltedCard from "./utilities/TiltedCard";
import BubbleMenu from "./utilities/BubbleMenu.jsx";

export const Aboutus = () => {
  const items = [
    {
      label: "For You",
      href: "#",
      ariaLabel: "For You",
      rotation: -8,
      hoverStyles: {
        bgColor: "#3b82f6",
        textColor: "#ffffff",
      },
    },
    {
      label: "About",
      href: "#",
      ariaLabel: "About",
      rotation: 8,
      hoverStyles: {
        bgColor: "#10b981",
        textColor: "#ffffff",
      },
    },
    {
      label: "Sign Up",
      href: "#",
      ariaLabel: "Projects",
      rotation: 8,
      hoverStyles: {
        bgColor: "#f59e0b",
        textColor: "#ffffff",
      },
    },
  ];

  function ProfileCard({
    imgSrc,
    Name,
    description,
    title,
    github,
    gmail,
    linkedin,
  }) {
    return (
      <div className="shadow-xl p-4 bg-white rounded-2xl flex flex-col items-center mt-5 mx-5 pb-6 max-w-md">
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
            <p className="text-white p-3 font-bold bg-black/50 rounded-2xl text-center">
              {Name}
            </p>
          }
        />

        {/* TEXT SECTION */}
        <div className="flex flex-col w-full mt-4 text-left">
          <h1 className="font-bold text-2xl mb-2 text-center">{title}</h1>

          {/* LEFT-ALIGNED DESCRIPTION */}
          <p className="text-gray-500 text-left leading-relaxed">
            {description}
          </p>

          <div className="flex justify-center gap-3 mt-5 flex-wrap">
            {github && (
              <a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-700"
              >
                <i className="fa-brands fa-github text-base mx-0.5"></i> 
                GitHub
              </a>
            )}

            {gmail && (
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${gmail}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600"
              >
                <i className="fa-regular fa-envelope text-base mx-0.5"></i> 
                Gmail
              </a>
            )}

            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-700 text-white rounded-full text-sm font-medium hover:bg-blue-800"
              >
                <i className="fa-brands fa-linkedin text-base mx-0.5"></i>
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-green-50">
      <NavBar />

      <div className="sm:hidden">
        <BubbleMenu
          logo={
            <span style={{ fontWeight: 700, color: "green" }}>
              Ask Baguio
            </span>
          }
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
        <p className="text-gray-600 border-2 border-green-400 px-4 rounded-2xl bg-green-300 mx-auto">
          THE CREATORS
        </p>

        <h1 className="text-7xl font-bold max-sm:text-4xl">
          Meet the Team <br />
          <span>Behind the Mist</span>
        </h1>

        <p className="max-w-sm mx-auto text-gray-600">
          We're just two students inspired by Baguio, building tools to help you
          discover hidden gems.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4 pb-16">
        <ProfileCard
          imgSrc="/imgs/ANDRE.jpeg"
          description="Andrei is a Computer Engineering student from Baguio with skills in frontend and backend development. He works on the core logic of the Baguio Tourist System, helping build a smart, reliable, and user-friendly platform through React, JavaScript, Node.js, and web-based system development."
          Name="MUDDFLOW"
          title="Backend Developer"
          github="Andrizzz1"
          gmail="andreimandapat09@gmail.com"
          linkedin="https://www.linkedin.com/in/andrei-domsing-165750341/"
        />

        <ProfileCard
          imgSrc="/imgs/YURI.jpeg"
          description="Tristan is a Computer Engineering student and project collaborator responsible for assisting in the frontend design of the Baguio Tourist System, contributing to the platform’s visual appearance through interface styling, font selection, image sourcing, and helping improve the overall user experience and content arrangement of the system."
          Name="YURIII"
          title="Frontend Developer"
          github="definitelynotyuriii"
          gmail="delacruztristan02@gmail.com"
          linkedin="https://www.linkedin.com/in/tristan-dela-cruz-268143374/"
        />
      </div>
    </section>
  );
};