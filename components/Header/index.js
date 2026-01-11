import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CSSTransition } from "react-transition-group";
import Button from "../Button";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
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
        className="text-base mob:text-lg tablet:text-xl font-medium cursor-pointer link"
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
              <Button onClick={() => router.push("/resume")} classes="ml-1">
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
        <button
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="p-1"
        >
          <HiOutlineMenuAlt3 className="w-8 h-8" />
        </button>
      )}
      <CSSTransition
        in={isOpen}
        timeout={200}
        classNames="transition"
        unmountOnExit
      >
        <div className="absolute top-20 right-4 bg-slate-800 rounded-md shadow-lg p-4">
          {!isBlog ? (
            <>
              <Button onClick={handleWorkScroll}>Work</Button>
              <Button onClick={handleAboutScroll}>About</Button>
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
      </CSSTransition>
    </div>
  );
};

export default Header;
