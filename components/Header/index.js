import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Button from "../Button";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
// Local Data
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const router = useRouter();
  const { name, showBlog, showResume } = data;
  const [isOpen, setIsOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);

  useEffect(() => {
    const updateBackgroundSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 750) {
        setShowHamburger(true);
      } else {
        setShowHamburger(false);
      }
    };

    window.addEventListener("resize", updateBackgroundSize);
    updateBackgroundSize();

    return () => window.removeEventListener("resize", updateBackgroundSize);
  }, []);

  return (
    <div className="flex items-center justify-between sticky top-0 z-10 bg-transparent p-4">
      <h1
        onClick={() => router.push("/")}
        className="font-medium cursor-pointer link"
      >
        {name}.
      </h1>
      <div className={`flex items-center ${showHamburger && "hidden"}`}>
        {!isBlog ? (
          <>
            <Button onClick={handleWorkScroll}>Work</Button>
            <Button onClick={handleAboutScroll}>About</Button>
            {showBlog && <Button onClick={() => router.push("/blog")}>Blog</Button>}
            {showResume && (
              <Button onClick={() => window.open("mailto:austinkelsay@protonmail.com")}>
                Resume
              </Button>
            )}
            <Button onClick={() => window.open("mailto:austinkelsay@protonmail.com")}>
              Contact
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => router.push("/")}>Home</Button>
            {showBlog && <Button onClick={() => router.push("/blog")}>Blog</Button>}
            {showResume && (
              <Button onClick={() => router.push("/resume")} classes="ml-1">
                Resume
              </Button>
            )}
            <Button onClick={() => window.open("mailto:austinkelsay@protonmail.com")}>
              Contact
            </Button>
          </>
        )}
      </div>
      {showHamburger && (
        <div>
          <HiOutlineMenuAlt3
            className="w-8 h-8 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      )}
      <Transition
        show={isOpen}
        as="div"
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="absolute top-20 right-4 bg-slate-800 rounded-md shadow-lg p-4">
          {!isBlog ? (
            <>
              <Button onClick={handleWorkScroll}>Work</Button>
              <Button onClick={handleAboutScroll}>About</Button>
              {showBlog && <Button onClick={() => router.push("/blog")}>Blog</Button>}
              {showResume && (
                <Button onClick={() => window.open("mailto:austinkelsay@protonmail.com")}>
                  Resume
                </Button>
              )}
              <Button onClick={() => window.open("mailto:austinkelsay@protonmail.com")}>
                Contact
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => router.push("/")}>Home</Button>
              {showBlog && <Button onClick={() => router.push("/blog")}>Blog</Button>}
              {showResume && (
                <Button onClick={() => router.push("/resume")} classes="ml-1">
                  Resume
                </Button>
              )}
              <Button onClick={() => window.open("mailto:austinkelsay@protonmail.com")}>
                Contact
              </Button>
            </>
          )}
        </div>
      </Transition>
    </div>
  );
};

export default Header;