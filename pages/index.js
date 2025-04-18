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
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
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
        <div className="laptop:mt-20 mt-10 mob:mx-4">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            {/* <h1
              ref={textTwo}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineTwo}
            </h1> */}
            <h1
              ref={textThree}
              className="text-xl tablet:text-2xl laptop:text-2xl laptopl:text-4xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-xl tablet:text-2xl laptop:text-2xl laptopl:text-4xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineFour}
            </h1>
            <button
              className="lud16"
              onClick={() => copyToClipboard(data.lud16)}
            >
              ⚡ {data.lud16}
            </button>
            {showCopyConfirmation && <div className="copied-notification">Copied to clipboard!</div>}
            {showSuccess && <div className="copied-notification">Payment successful!</div>}
          </div>

          <Socials className="mt-2 laptop:mt-5" />
        </div>
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold">Work.</h1>

          <div className="mt-5 laptop:mt-10 grid gap-4 laptopl:grid-cols-2 desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 mob:grid-cols-1">
            {data.projects.slice(0, visibleProjects).map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                role={project.role}
                description={project.description}
                github={project.github || null}
                onClick={() => window.open(project.url, "_blank")}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 w-full flex justify-center">
          {visibleProjects < data.projects.length && (
            <button
              onClick={() => setVisibleProjects(prevVisibleProjects => Math.min(prevVisibleProjects + 6, data.projects.length))}
              style={{ backgroundImage: 'radial-gradient(at top right, #51afc8 0%, #384acb 100%)' }}
              className="py-3 px-5 text-white rounded hover:bg-blue-700 transition duration-300 hover:opacity-80"
            >
              Show More
            </button>

          )}
        </div>

        <div className="mt-28 laptop:mt-30 p-2 laptop:p-0 mob:mt-10">
          <h1 className="text-2xl text-bold">Media.</h1>

          <div className="mt-5 laptop:mt-10 grid gap-4 laptopl:grid-cols-2 desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 mob:grid-cols-1">
            {data.media.slice(0, visibleMedia).map((media) => (
              <MediaCard
                key={media.id}
                img={media.imageSrc}
                name={media.title}
                role={media.role}
                description={media.description}
                onClick={() => window.open(media.url, "_blank")}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 w-full flex justify-center">
          {visibleMedia < data.media.length && (
            <button
              onClick={() => setVisibleMedia(prevVisibleMedia => Math.min(prevVisibleMedia + 6, data.media.length))}
              style={{ backgroundImage: 'radial-gradient(at top right, #51afc8 0%, #384acb 100%)' }}
              className="py-3 px-5 text-white rounded hover:bg-blue-700 transition duration-300 hover:opacity-80"
            >
              Show More
            </button>

          )}
        </div>

        <div className="mt-20 laptop:mt-40 p-2 laptop:p-0">
          <h1 className="text-3xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Skills</span>
          </h1>
          <div className="mt-10 grid grid-cols-1 laptop:grid-cols-2 gap-8 px-4 laptop:px-0">
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
        <div className="mt-10 bg-gray-900 mob:bg-gray-800 laptop:mt-40 p-4 pt-8 rounded-lg laptop:p-6" ref={aboutRef}>
          <h1 className="pt-4 tablet:m-10 text-2xl text-bold">About.</h1>
          <div
            className="pb-4 tablet:m-10 mt-2 text-xl laptop:text-2xl w-full laptop:w-4/5 space-y-4"
            dangerouslySetInnerHTML={{ __html: data.aboutpara }}
          />
        </div>
        <footer className="mt-10 border-t-2 border-gray-800 pt-10 pb-6 flex flex-col items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Austin Kelsay. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
