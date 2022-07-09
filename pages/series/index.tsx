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

const Series: NextPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    setLoading(true);
    fetch(constants.api.baseUrl + constants.api.ytSearch + `?q="series"&lang=es`)
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
      <div
        className={`video-category-container p-4 flex items-center gap-4 flex-wrap ${
          size.width > 768 ? "justify-start" : "justify-center"
        }`}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          data?.map((item, _index) => (
            <VideoCard
              id={item.id}
              title={item.title}
              img={item.thumbnail}
              key={item.id}
            />
          ))
        )}
      </div>
    </Main>
  );
};

export default Series;
