import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import Button from "../components/Button";
// Data
import data from "../data/portfolio.json";

const Resume = () => {
  const router = useRouter();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    if (!data.showResume) {
      router.push("/");
    }
  }, []);
  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => router.push("/edit")} type={"primary"}>
            Edit Resume
          </Button>
        </div>
      )}
      <div
        className={`container mx-auto mb-10 ${data.showCursor && "cursor-none"
          }`}
      >
        <Header isBlog />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              className={"w-full bg-slate-800 max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm"}
            >
              <div className="w-full flex flex-row justify-between">
                <h1 className="text-3xl font-bold">Austin</h1>
                <a href="https://docs.google.com/document/d/1GYIp7oYkN9FPWf3rckVXR7_WH8It89_Nlj8VOw9gE6k/edit?usp=sharing" className="text-blue-500" target="_blank" rel="noreferrer"
                >Link to resume google doc</a>
              </div>
              <h2 className="w-full text-xl mt-5 opacity-50 px-4">
                {data.resume.description}
              </h2>
              <div className="mt-2">
                <Socials />
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Experience</h1>

                {data.resume.experiences.map(
                  ({ id, dates, type, position, bullets }) => (
                    <ProjectResume
                      key={id}
                      dates={dates}
                      type={type}
                      position={position}
                      bullets={bullets}
                    ></ProjectResume>
                  )
                )}
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Education</h1>
                <div className="mt-2">
                  <h2 className="text-lg">{data.resume.education.universityName}</h2>
                  <h3 className="text-sm opacity-75">
                    {data.resume.education.universityDate}
                  </h3>
                  <p className="text-sm mt-2 opacity-50">
                    {data.resume.education.universityPara}
                  </p>
                </div>
                <div className="mt-2">
                  <h2 className="text-lg">Bloomtech</h2>
                  <h3 className="text-sm opacity-75">
                    December 2018 - December 2019
                  </h3>
                  <p className="text-sm mt-2 opacity-50">
                    Full Stack Web Development Bootcamp
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Skills</h1>
                <div className="flex mob:flex-col desktop:flex-row justify-between">
                  {data.resume.languages && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Languages</h2>
                      <ul className="list-disc">
                        {data.resume.languages.map((language, index) => (
                          <li key={index} className="ml-5 py-2">
                            {language}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {data.resume.frameworks && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Frameworks</h2>
                      <ul className="list-disc">
                        {data.resume.frameworks.map((framework, index) => (
                          <li key={index} className="ml-5 py-2">
                            {framework}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {data.resume.backend && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Backend</h2>
                      <ul className="list-disc">
                        {data.resume.backend.map((backend, index) => (
                          <li key={index} className="ml-5 py-2">
                            {backend}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {data.resume.others && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Others</h2>
                      <ul className="list-disc">
                        {data.resume.others.map((other, index) => (
                          <li key={index} className="ml-5 py-2">
                            {other}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;
