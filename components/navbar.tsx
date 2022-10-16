import React from "react";
import { HumidIcon, SunIcon, VisibleIcon, WindIcon } from "./tools/icon";

interface navbarProps {
  handleNav: (val: number) => void;
}

export const Navbar: React.FC<navbarProps> = ({ handleNav }) => {
  return (
    <div className="w-full flex items-center justify-around py-4 px-2 bg-gray-300 rounded-xl mb-5">
      <div className="navItem" onClick={() => handleNav(1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-house-fill"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
          />
          <path
            fillRule="evenodd"
            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
          />
        </svg>
      </div>
      <div className="navItem" onClick={() => handleNav(2)}>
        <WindIcon size={26} />
      </div>
      <div className="navItem" onClick={() => handleNav(3)}>
        <SunIcon size={35} />
      </div>
      <div className="navItem" onClick={() => handleNav(4)}>
        <HumidIcon size={26} />
      </div>
      <div className="navItem" onClick={() => handleNav(5)}>
        <VisibleIcon size={26} />
      </div>
    </div>
  );
};
export default Navbar;
