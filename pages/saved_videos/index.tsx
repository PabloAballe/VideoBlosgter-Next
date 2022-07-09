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
  orderBy,
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
          where("user", "==", user.uid),
          orderBy("date_added", "desc")
        );
        const querySnapshot = await getDocs(q);

        let data = [];
        await querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setData(data);
        console.log(data);
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
        ) : data?.length > 0 ? (
          data?.map((item, _index) => (
            <VideoCard
              id={item.id}
              title={item.title}
              img={item.thumbnail}
              key={item.id}
            />
          ))
        ) : (
          <div className="alert alert-info shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Todavia no tienes videos guardados</span>
            </div>
          </div>
        )}
      </div>
    </Main>
  );
};

export default SavedVideos;
