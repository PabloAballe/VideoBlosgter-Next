import { useRouter } from "next/router";
import { useWindowSize } from "../../../utils/useWindowsSize";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { useRef } from "react";

interface SearchBarItemProps {
  id: string;
  title: string;
  img: string;
}

export const SearchBarItem = ({ id, title, img }: SearchBarItemProps) => {
  const router = useRouter();
  const input = useRef();
  const size = useWindowSize();

  return (
    // @ts-ignore: Object is possibly 'null'.
    <div className={`rounded w-96 ${size.width < 768 ? "" : ""}`}>
      <Link href={`/video/${id}`}>
        <div className="rounded-xl cursor-pointer hover:transform-gpu hover:scale-110 transition-all flex items-center justify-between bg-white glass  p-4  my-4 gap-4">
          <img
            src={img}
            className="w-24 h-16 rounded"
            loading="lazy"
            alt={title}
            title={title}
          />
          <p className="text-md">{title}</p>
        </div>
      </Link>
    </div>
  );
};

SearchBarItem.propTypes = {};
