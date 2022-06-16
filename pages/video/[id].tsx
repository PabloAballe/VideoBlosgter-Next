import { Main, SearchBar, VideoCard } from "../../components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as constants from "../../constants";
import ReactPlayer from "react-player";
import type { NextPage } from "next";

const VideoDetails: NextPage = () => {
  const router = useRouter();
  return (
    <Main>
      <SearchBar />
      <ReactPlayer url={`https://www.youtube.com/watch?v=${router.query.id}`} />
    </Main>
  );
};

export default VideoDetails;
