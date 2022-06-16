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
import { useRouter } from "next/router";
import { useWindowSize } from "../../utils/useWindowsSize";

const Series: NextPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const size = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(
      constants.api.baseUrl + constants.api.ytSearch + `?q="${router.query.q}"`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [router.query.q]);

  return (
    <Main>
      <SearchBar />

      <div className={`video-category-container p-4 flex items-center gap-4 flex-wrap ${size.width > 768 ? 'justify-start': "justify-center"}`}>
        {isLoading ? (
          <Spinner />
        ) : data?.length > 0 ? (
          data?.map((item, _index) => (
            <VideoCard
              id={item.id.videoId}
              title={item.title}
              img={item.snippet.thumbnails.url}
              key={item.id.videoId}
            />
          ))
        ) : (
            <div className="alert alert-warning shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>No se han encontrado resultados!</span>
            </div>
          </div>
        )}
      </div>
    </Main>
  );
};

export default Series;
