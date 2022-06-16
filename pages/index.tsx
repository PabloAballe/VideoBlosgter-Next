import { Main, MainBanner, SearchBar, Spinner, VideoCard } from "../components";
import { useEffect, useState } from "react";
import * as constants from "../constants";
import type { NextPage } from "next";
import { useWindowSize } from "../utils/useWindowsSize";

const Home: NextPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    setLoading(true);
    fetch(constants.api.baseUrl + constants.api.ytSearch + `?q="VBlog"`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <Main>
      <SearchBar />
      <MainBanner
        title="Video Blogster Website"
        img={`/${constants.site.icon}`}
      />
      <div className={`video-category-container p-4 flex items-center gap-4 flex-wrap ${size.width > 768 ? 'justify-start': "justify-center"}`}>
        {isLoading ? (
          <Spinner />
        ) : (
          data?.map((item, _index) => (
            <VideoCard
              id={item.id.videoId}
              title={item.title}
              img={item.snippet.thumbnails.url}
              key={item.id.videoId}
            />
          ))
        )}
      </div>
    </Main>
  );
};

export default Home;
