import React from "react";
import PropTypes from "prop-types";
import { VideoPlayListItemStyles } from "./VideoPlayListItem.styles";
import Link from "next/link";

export const VideoPlayListItem = ({ id, title, img, active = false }) => {
  return (
    <VideoPlayListItemStyles
      className={`w-full rounded py-4 px-2 ${active ? "playlist-active" : ""}`}
    >
      <Link href={`/video/${id}`}>
        <div className="rounded cursor-pointer hover:transform-gpu hover:scale-110 transition-all">
          <img
            src={img}
            className="rounded w-full m-auto"
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
