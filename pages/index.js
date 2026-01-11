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
              className="text-4xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 font-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textThree}
              className="text-lg tablet:text-2xl laptop:text-2xl laptopl:text-4xl p-1 tablet:p-2 font-bold w-full laptop:w-4/5 mt-2 mob:mt-4"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-lg tablet:text-2xl laptop:text-2xl laptopl:text-4xl p-1 tablet:p-2 font-bold w-full laptop:w-4/5 mt-1 mob:mt-3"
            >
              {data.headerTaglineFour}
            </h1>
            <button
              className="mt-6 mob:mt-8 py-3 px-5 text-sm tablet:text-base text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
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
          <h1 className="text-2xl font-bold">Work</h1>

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
          <h1 className="text-2xl font-bold">Media</h1>

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
          <h1 className="text-2xl font-bold">Skills</h1>
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
          <h1 className="text-2xl font-bold">About</h1>
          <div className="mt-5 laptop:mt-10 bg-black/40 border border-gray-800 rounded-lg p-5 laptop:p-6">
            <div
              className="text-base laptop:text-lg text-gray-300 w-full laptop:w-4/5 space-y-4"
              dangerouslySetInnerHTML={{ __html: data.aboutpara }}
            />
          </div>
        </div>
        <footer className="mt-20 pt-10 pb-6 border-t border-gray-800 flex flex-col items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Austin Kelsay. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
