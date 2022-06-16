import React from "react";
import PropTypes from "prop-types";
import { VideoCardStyles } from "./VideoCard.styles";
import Link from "next/link";

export const VideoCard = ({ id, title, img }) => {
  return (
    <VideoCardStyles>
      <Link href={`/video/${id}`}>
        <div className="rounded cursor-pointer hover:transform-gpu hover:scale-110 transition-all">
          <img
            src={img}
            className="w-80 h-52 rounded"
            loading="lazy"
            alt={title}
            title={title}
          />
        </div>
      </Link>
    </VideoCardStyles>
  );
};

VideoCard.propTypes = {};
