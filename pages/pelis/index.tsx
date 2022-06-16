import {
  Main,
  MainBanner,
  SearchBar,
  Spinner,
  VideoCard,
} from "../../components";
import { useEffect, useState } from "react";
import * as constants from "../../constants";
import type { NextPage } from "next";
import { useWindowSize } from "../../utils/useWindowsSize";

const Pelis: NextPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    setLoading(true);
    fetch(constants.api.baseUrl + constants.api.ytSearch + `?q="peliculas"`)
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
        title="Películas"
        img={`https://clouddevs.com/3dbay/files/preview/1280x854/11641225607skl09l94l35m2pzgbrkjodujwydnxp7epzer070fean6zwdygcwacozednifuczww8jnad4gn66papdaib02tvis5mquxgoyvxhb.png`}
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

export default Pelis;
