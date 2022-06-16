import React from "react";
import PropTypes from "prop-types";
import { useWindowSize } from "../../../utils/useWindowsSize";

interface MainBannerProps {
  title: string;
  img: string;
}

export const MainBanner = ({ title, img }: MainBannerProps) => {
  const size = useWindowSize();
  return (
    <div className={`rounded ${size.width < 768 ? "" : "px-32"} py-4`}>
      <div className="flex flex-wrap md items-center">
        <div className="bg-white w-full md:w-1/2 ">
          <div className="">
            <h1 className="text-6xl font-bold mt-16 z-10">{title}</h1>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={img}
            className=" w-56 hover:transform-gpu hover:scale-110 transition-all"
            alt={title}
            title={title}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

MainBanner.propTypes = {};
