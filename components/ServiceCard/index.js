import React, { useEffect, useState } from "react";

const ServiceCard = ({ name, description }) => {
  const [mounted, setMounted] = useState();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      className={"w-full bg-gray-900 mob:bg-gray-800 p-4 mob:p-4 rounded-lg transition-all ease-out duration-300"}
    >
      <h1 className="text-3xl">{name ? name : "Heading"}</h1>
      <p className="mt-5 opacity-40 text-xl">
        {description
          ? description
          : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "}
      </p>
    </div>
  );
};

export default ServiceCard;
