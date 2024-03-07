import React, { useState, useEffect } from "react";

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
  </svg>
);


const WorkCard = ({ img, name, role, description, onClick }) => {
  const [backgroundSize, setBackgroundSize] = useState("cover");
  const [backgroundHeight, setBackgroundHeight] = useState("400px");

  useEffect(() => {
    const updateBackgroundSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 375) {  // for 'mob' size
        setBackgroundSize("contain");
        setBackgroundHeight("280px");  // Height for mobile
      } else if (screenWidth < 768) {  // for 'tablet' size
        setBackgroundSize("contain");
        setBackgroundHeight("280px");  // Height for tablet
      } else if (screenWidth < 1024) {  // for 'laptop' size
        setBackgroundSize("contain");
        setBackgroundHeight("300px");  // Height for laptop
      } else if (screenWidth < 1280) {  // for 'desktop' size
        setBackgroundSize("cover");
        setBackgroundHeight("330px");  // Height for desktop
      } else {  // for larger screens
        setBackgroundSize("cover");
        setBackgroundHeight("380px");  // Height for larger screens
      }
    };

    window.addEventListener("resize", updateBackgroundSize);
    updateBackgroundSize();

    return () => window.removeEventListener("resize", updateBackgroundSize);
  }, []);

  return (
    <div className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 link cursor-pointer">
      <div
        onClick={onClick}
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 bg-opacity-hover"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: backgroundSize,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: backgroundHeight,
        }}
      >
      </div>
      <div className="flex flex-row w-full justify-between">
        <h1 className="mt-5 text-3xl font-medium">
          {name ? name : "Project Name"}
        </h1>
        <div className="mt-5 hover:opacity-60 cursor-pointer">
          <GithubIcon size={44} />
        </div>
      </div>
      <h2 className="text-xl opacity-50">
        {role ? role : "Role"}
      </h2>
      <h2 className="mt-2 text-lg text-ghostwhite">
        {description ? description : "Description"}
      </h2>
    </div>
  );
};

export default WorkCard;
