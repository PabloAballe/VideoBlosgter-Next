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
import { phraseGenerator } from "../../utils";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

import { auth, db } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useWindowSize } from "../../utils/useWindowsSize";

const SavedVideos: NextPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const size = useWindowSize();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const fetchVideo = async () => {
        const q = query(
          collection(db, "savedVideos"),
          where("user", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        let data = [];
        await querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setData(data)
        console.log(data)
        setLoading(false);
      };
      

      fetchVideo();
    }
  }, [user]);
  return (
    <Main>
      <SearchBar />
      <MainBanner title="Videos Guardados" img={`/${constants.site.icon}`} />
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
              id={item.info.videoId}
              title={item.info.title}
              img={item.info.thumbnails[0].url}
              key={item.info.videoId}
            />
          ))
        )}
      </div>
    </Main>
  );
};

export default SavedVideos;
