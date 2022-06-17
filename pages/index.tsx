import { Main, MainBanner, SearchBar, Spinner, VideoCard } from "../components";
import { useEffect, useState } from "react";
import * as constants from "../constants";
import type { NextPage } from "next";
import { useWindowSize } from "../utils/useWindowsSize";
import { auth, db, logout } from "../utils/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Router, { useRouter } from "next/router";

const Home: NextPage = () => {
  const [data, setData] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(false);
  const size = useWindowSize();
  const [userOwn, setUserOwn] = useState({});

  const router = useRouter();

  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setUserOwn(data);
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occured while fetching user data");
  //   }
  // };

  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) return router.push("/");
  //   fetchUserName();
  // }, [user, loading]);

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
