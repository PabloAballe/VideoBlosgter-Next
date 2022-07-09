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

const Music: NextPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    setLoading(true);
    fetch(constants.api.baseUrl + constants.api.ytSearch + `?q="musica"&lang=es`)
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
        title="Música"
        img={`https://clouddevs.com/3dbay/files/preview/1280x896/11641583676nsnlzmmdgll4rgmkgy3j6pqejmnrpx0kxoga1dbkkfpca779ea9agm3ys5j1wdifrlhggcjphlugcmvcwpwt9z6okkwbnby0eyho.png`}
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

export default Music;
