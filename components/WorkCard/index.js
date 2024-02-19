import React from "react";

const WorkCard = ({ img, name, role, description, onClick }) => {
  return (
    <div className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 link cursor-pointer">
      <div
        onClick={onClick}
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-48 mob:h-auto bg-opacity-hover"
        style={{
          height: "300px",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
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
