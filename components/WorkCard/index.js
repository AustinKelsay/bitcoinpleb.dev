import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaGithub } from "react-icons/fa";

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler github-icon icons-tabler-filled icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" /></svg>
);

const WorkCard = ({ img, name, role, description, onClick, github }) => {
  const [backgroundSize, setBackgroundSize] = useState("cover");
  const [backgroundHeight, setBackgroundHeight] = useState("400px");
  const router = useRouter();

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
        {github &&
          <div onClick={() => window.open(github, '_blank')} className="mt-5 hover:opacity-60 cursor-pointer">
            <FaGithub size={32} />
          </div>
        }
      </div>
      <h2 className="text-xl opacity-50">
        {role ? role : "Role"}
      </h2>
      <h2 className="mt-2 text-lg text-ghostwhite">
        {description ? description : "Description"}
      </h2>
    </div >
  );
};

export default WorkCard;
