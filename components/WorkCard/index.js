import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaGithub, FaGlobe } from "react-icons/fa";
import Image from "next/image";

const WorkCard = ({ img, name, role, description, onClick, github }) => {
  const [backgroundHeight, setBackgroundHeight] = useState("380px");
  const router = useRouter();

  useEffect(() => {
    const updateImageHeight = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 375) {  // for 'mob' size
        setBackgroundHeight("200px");  // Height for mobile
      } else if (screenWidth < 768) {  // for 'tablet' size
        setBackgroundHeight("240px");  // Height for tablet
      } else if (screenWidth < 1024) {  // for 'laptop' size
        setBackgroundHeight("280px");  // Height for laptop
      } else if (screenWidth < 1280) {  // for 'desktop' size
        setBackgroundHeight("330px");  // Height for desktop
      } else {  // for larger screens
        setBackgroundHeight("380px");  // Height for larger screens
      }
    };

    window.addEventListener("resize", updateImageHeight);
    updateImageHeight();

    return () => window.removeEventListener("resize", updateImageHeight);
  }, []);

  return (
    <div className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 transition-all duration-300 hover:-translate-y-1 bg-black/40 border border-gray-800">
      <div
        onClick={onClick}
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 cursor-pointer"
        style={{ height: backgroundHeight }}
      >
        <div className="absolute inset-0 rounded-lg">
          <Image
            src={img}
            alt={name || "Project Image"}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-70 transition-opacity duration-300 rounded-lg"></div>
      </div>
      <div className="mt-4 space-y-2 laptop:space-y-3">
        <h1 className="text-xl mob:text-lg laptop:text-2xl font-bold pr-2 line-clamp-1">
          {name ? name : "Project Name"}
        </h1>
        <h2 className="text-base mob:text-sm laptop:text-lg text-blue-400 font-medium line-clamp-1">
          {role ? role : "Role"}
        </h2>
        <h2 className="text-sm mob:text-xs laptop:text-base text-gray-300 line-clamp-2 laptop:line-clamp-3">
          {description ? description : "Description"}
        </h2>
        <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-gray-700/50">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex items-center px-3 py-1.5 laptop:px-4 laptop:py-2 text-xs laptop:text-sm text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-500/20 rounded transition-colors duration-200 cursor-pointer"
            title="Visit Website"
          >
            <FaGlobe size={12} className="mr-1.5 laptop:size-[16px]" />
            Site
          </button>
          {github &&
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(github, '_blank');
              }}
              className="flex items-center px-3 py-1.5 laptop:px-4 laptop:py-2 text-xs laptop:text-sm text-gray-300 hover:text-white bg-gray-700/40 hover:bg-gray-700/70 rounded transition-colors duration-200 cursor-pointer"
              title="View on GitHub"
            >
              <FaGithub size={12} className="mr-1.5 laptop:size-[16px]" />
              Code
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
