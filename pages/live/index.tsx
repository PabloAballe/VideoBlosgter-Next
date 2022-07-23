import { useEffect, useState } from "react";
import { useWindowSize } from "../../utils/useWindowsSize";
import * as components from "../../components";
import * as constants from "../../constants";
import type { NextPage } from "next";

const Pelis: NextPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    setLoading(true);
    fetch(
      constants.api.baseUrl +
        constants.api.ytSearchLive +
        `?q="en vivo"&lang=es`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <components.Main>
      <components.SearchBar />
      <components.MainBanner
        title="Live"
        img={`https://clouddevs.com/3dbay/files/preview/1280x854/11641225607skl09l94l35m2pzgbrkjodujwydnxp7epzer070fean6zwdygcwacozednifuczww8jnad4gn66papdaib02tvis5mquxgoyvxhb.png`}
      />
      <div
        className={`video-category-container p-4 flex items-center gap-4 flex-wrap ${
          size.width > 768 ? "justify-start" : "justify-center"
        }`}
      >
        {isLoading ? (
          <components.Spinner />
        ) : (
          data?.map((item, _index) => (
            <components.VideoCard
              id={item.id}
              title={item.title}
              img={item.thumbnail}
              key={item.id}
            />
          ))
        )}
      </div>
    </components.Main>
  );
};

export default Pelis;
