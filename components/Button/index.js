import React from "react";
import data from "../../data/portfolio.json";

const Button = ({ children, type, onClick, classes }) => {
  if (type === "primary") {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`text-sm tablet:text-base py-1.5 px-3 tablet:py-2 tablet:px-4 m-1 rounded-lg text-white font-medium bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg first:ml-0 link ${data.showCursor && "cursor-none"
          }  ${classes}`}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      type="button"
      className={`text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 hover:bg-slate-600 text-white tablet:first:ml-0 ${data.showCursor && "cursor-none"
        } ${classes} link`}
    >
      {children}
    </button>
  );
};

export default Button;
