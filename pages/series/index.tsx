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

const Series: NextPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(constants.api.baseUrl + constants.api.ytSearch + `?q="series"`)
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
        title="Series"
        img={`https://clouddevs.com/3dbay/files/preview/1280x1067/11641573174v1ddjztohp8prjw2gn41mtdfo7qqpal4enlbgxi3l4b83zoxyomabqxfnouybtlsp4snz4l73e3vjtqzbut3w8niaqujwfaqf2ul.png`}
      />
      <div className="video-category-container p-4 flex items-center gap-4 justify-start flex-wrap">
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

export default Series;