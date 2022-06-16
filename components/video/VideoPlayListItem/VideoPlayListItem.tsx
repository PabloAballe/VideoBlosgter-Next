import React from "react";
import PropTypes from "prop-types";
import { VideoPlayListItemStyles } from "./VideoPlayListItem.styles";
import Link from "next/link";
import { useWindowSize } from "../../../utils/useWindowsSize";

export const VideoPlayListItem = ({ id, title, img, active = false }) => {
  const size = useWindowSize();
  return (
    <VideoPlayListItemStyles
      className={`w-full rounded py-4 px-2 ${active ? "playlist-active" : ""}`}
    >
      <Link href={`/video/${id}`}>
        <div className="rounded m-auto cursor-pointer hover:transform-gpu hover:scale-110 transition-all">
          <img
            src={img}
            className={`rounded w-full m-auto ${size.width > 768 ? "img" : "img-mobile"}`}
            loading="lazy"
            alt={title}
            title={title}
          />
        </div>
      </Link>
    </VideoPlayListItemStyles>
  );
};

VideoPlayListItem.propTypes = {};
