import React, { useState, useEffect } from "react";

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
      <h1 className="mt-5 text-3xl font-medium">
        {name ? name : "Project Name"}
      </h1>
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
