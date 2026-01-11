import { useRef, useState } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import MediaCard from "../components/MediaCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";

// Local Data
import data from "../data/portfolio.json";

// Sort projects by createdAt date (newest first)
const sortedProjects = [...data.projects].sort((a, b) => {
  if (!a.createdAt) return 1;
  if (!b.createdAt) return -1;
  return new Date(b.createdAt) - new Date(a.createdAt);
});

// Sort media by createdAt date (newest first)
const sortedMedia = [...data.media].sort((a, b) => {
  if (!a.createdAt) return 1;
  if (!b.createdAt) return -1;
  return new Date(b.createdAt) - new Date(a.createdAt);
});

export default function Home() {
  // state
  const [showCopyConfirmation, setShowCopyConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [visibleMedia, setVisibleMedia] = useState(6);
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopyConfirmation(true);
      setTimeout(() => setShowCopyConfirmation(false), 2000); // Hide confirmation after 2 seconds
      if (window && window?.webln && window?.webln?.lnurl) {
        await window.webln.enable();
        const result = await window.webln.lnurl("austin@bitcoinpleb.dev");
        if (result && result?.preimage) {
          setShowSuccess(true);
        }
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 30 },
      { y: 0 }
    );
  }, []);

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="laptop:mt-20 mt-10 mob:px-6 px-4">
          <div className="mt-5 mob:text-center tablet:text-left">
            <h1
              ref={textOne}
              className="text-3xl mob:text-4xl tablet:text-5xl laptop:text-6xl laptopl:text-7xl p-1 tablet:p-2 font-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textThree}
              className="text-base mob:text-lg tablet:text-xl laptop:text-2xl laptopl:text-3xl p-1 tablet:p-2 font-bold w-full laptop:w-4/5 mt-2 mob:mt-4"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-base mob:text-lg tablet:text-xl laptop:text-2xl laptopl:text-3xl p-1 tablet:p-2 font-bold w-full laptop:w-4/5 mt-1 mob:mt-3"
            >
              {data.headerTaglineFour}
            </h1>
            <button
              className="mt-6 ml-2 mob:mt-8 py-2 px-3 mob:py-2.5 mob:px-4 tablet:py-3 tablet:px-5 text-xs mob:text-sm tablet:text-lg text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => copyToClipboard(data.lud16)}
            >
              ⚡ {data.lud16}
            </button>
            {showCopyConfirmation && <div className="copied-notification">Copied to clipboard!</div>}
            {showSuccess && <div className="copied-notification">Payment successful!</div>}
          </div>

          <Socials className="mt-4 mob:mt-6 laptop:mt-5 mob:justify-center tablet:justify-start" />
        </div>
        <div className="mt-10 laptop:mt-32 p-2 laptop:p-0" ref={workRef}>
          <h1 className="text-xl mob:text-2xl tablet:text-3xl laptop:text-4xl font-bold">Work</h1>

          <div className="mt-5 laptop:mt-10 grid gap-4 laptopl:grid-cols-2 desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 mob:grid-cols-1">
            {sortedProjects.slice(0, visibleProjects).map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                role={project.role}
                description={project.description}
                github={project.github || null}
                date={project.createdAt}
                onClick={() => window.open(project.url, "_blank")}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 w-full flex justify-center">
          {visibleProjects < sortedProjects.length && (
            <button
              onClick={() => setVisibleProjects(prevVisibleProjects => Math.min(prevVisibleProjects + 6, sortedProjects.length))}
              className="py-2 px-4 text-sm text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Show More
            </button>

          )}
        </div>

        <div className="mt-28 laptop:mt-32 p-2 laptop:p-0 mob:mt-10">
          <h1 className="text-xl mob:text-2xl tablet:text-3xl laptop:text-4xl font-bold">Media</h1>

          <div className="mt-5 laptop:mt-10 grid gap-4 laptopl:grid-cols-2 desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 mob:grid-cols-1">
            {sortedMedia.slice(0, visibleMedia).map((media) => (
              <MediaCard
                key={media.id}
                img={media.imageSrc}
                name={media.title}
                role={media.role}
                description={media.description}
                date={media.createdAt}
                onClick={() => window.open(media.url, "_blank")}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 w-full flex justify-center">
          {visibleMedia < sortedMedia.length && (
            <button
              onClick={() => setVisibleMedia(prevVisibleMedia => Math.min(prevVisibleMedia + 6, sortedMedia.length))}
              className="py-2 px-4 text-sm text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Show More
            </button>

          )}
        </div>

        <div className="mt-20 laptop:mt-40 p-2 laptop:p-0">
          <h1 className="text-xl mob:text-2xl tablet:text-3xl laptop:text-4xl font-bold">Skills</h1>
          <div className="mt-5 laptop:mt-10 grid grid-cols-1 laptop:grid-cols-2 gap-4">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
        {/* This button should not go into production */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}
        <div className="mt-20 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="text-xl mob:text-2xl tablet:text-3xl laptop:text-4xl font-bold">About</h1>
          <div className="mt-5 laptop:mt-10 bg-black/40 border border-gray-800 rounded-lg p-5 laptop:p-6">
            <div
              className="text-base laptop:text-lg text-gray-300 w-full laptop:w-4/5 space-y-4"
              dangerouslySetInnerHTML={{ __html: data.aboutpara }}
            />
          </div>
        </div>
        <footer className="mt-20 pt-10 pb-6 border-t border-gray-800 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            {data.socials.map((social) => (
              <a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                title={social.title}
              >
                {social.title === "GitHub" && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                )}
                {social.title === "LinkedIn" && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                )}
                {social.title === "Twitter" && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                )}
                {social.title === "Nostr" && (
                  <svg className="w-[30px] h-[30px]" viewBox="0 0 256 256" fill="currentColor"><path d="M210.8 199.4c0 3.1-2.5 5.7-5.7 5.7h-68c-3.1 0-5.7-2.5-5.7-5.7v-15.5c.3-19 2.3-37.2 6.5-45.5 2.5-5 6.7-7.7 11.5-9.1 9.1-2.7 24.9-.9 31.7-1.2 0 0 20.4.8 20.4-10.7s-9.1-8.6-9.1-8.6c-10 .3-17.7-.4-22.6-2.4-8.3-3.3-8.6-9.2-8.6-11.2-.4-23.1-34.5-25.9-64.5-20.1-32.8 6.2.4 53.3.4 116.1v8.4c0 3.1-2.6 5.6-5.7 5.6H57.7c-3.1 0-5.7-2.5-5.7-5.7v-144c0-3.1 2.5-5.7 5.7-5.7h31.7c3.1 0 5.7 2.5 5.7 5.7 0 4.7 5.2 7.2 9 4.5 11.4-8.2 26-12.5 42.4-12.5 36.6 0 64.4 21.4 64.4 68.7v83.2ZM150 99.3c0-6.7-5.4-12.1-12.1-12.1s-12.1 5.4-12.1 12.1 5.4 12.1 12.1 12.1S150 106 150 99.3Z"/></svg>
                )}
                {social.title === "Email" && (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                )}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Austin Kelsay. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
