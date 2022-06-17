const keyword_extractor = require("keyword-extractor");
import "plyr/dist/plyr.css";
import { auth, db } from "../../utils/firebase";
import { Main, SearchBar, Spinner, VideoPlayListItem } from "../../components";
import { RWebShare } from "react-web-share";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useWindowSize } from "../../utils/useWindowsSize";

import { ToastContainer, toast } from "react-toastify";
import * as constants from "../../constants";
import Plyr from "plyr";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import type { NextPage } from "next";

const VideoDetails: NextPage = () => {
  const [data, setData] = useState(null);
  const [isDownloading, setDownloading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingVideo, setLoadingVideo] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [videoSaved, setVideoSaved] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const size = useWindowSize();
  const playerRef = useRef();
  let playList: [] = [];

  function download(url) {
    try {
      setDownloading(true);
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
      xhr.onload = function () {
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement("a");
        tag.href = imageUrl;
        tag.target = "_blank";
        tag.download = `${videoData.info.title}.mp4`;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
      };
      xhr.onerror = (err) => {
        alert("Failed to download the video");
      };
      xhr.send();
    } catch (error) {
      console.log(error);
    }

    setDownloading(false);
  }

  useEffect(() => {
    setLoading(true);
    if (router.query.id)
      fetch(
        constants.api.baseUrl +
          constants.api.ytDownload +
          `?id=${router.query.id}`
      )
        .then((res) => res.json())
        .then(async (data) => {
          setVideoData(data);
          setLoadingVideo(false);
          const player = new Plyr("#player", {
            autoplay: true,

            previewThumbnails: {
              src: data.info.thumbnails.url,
            },
          });
          // @ts-ignore: Object is possibly 'null'.
          playerRef.current?.load();
          // @ts-ignore: Object is possibly 'null'.
          playerRef.current?.play();
        });
  }, [router.query.id]);

  const deleteVideoFromSaved = async () => {
    if (user) {
      const q = query(
        collection(db, "savedVideos"),
        where("videoId", "==", videoData?.info.videoId)
      );
      const querySnapshot = await getDocs(q);

      await querySnapshot.forEach((doc) => {
        // doc.get().then((doc) => {
        //   doc.delete();
        // })
        console.log(doc.ref);
      });

      toast.warn("Tu video se ha quitado de guardados", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const saveVideo = async () => {
    if (videoData) {
      await addDoc(collection(db, "savedVideos"), {
        ...videoData,
        videoId: videoData.info.videoId,
        user: user?.uid,
      });
      setVideoSaved(true);
      toast.success("Tu video se ha guardado", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    if (videoData) {
      const fetchVideo = async () => {
        const q = query(
          collection(db, "savedVideos"),
          where("videoId", "==", videoData?.info.videoId)
        );
        const docs = await getDocs(q);
        if (docs && docs.docs.length > 0) setVideoSaved(true);
      };

      fetchVideo();
    }
  }, [videoData]);

  useEffect(() => {
    if (videoData) {
      //let keywords = keyword_extractor.extract(videoData.info.title);
      setLoading(true);
      fetch(
        constants.api.baseUrl +
          constants.api.ytSearch +
          `?q="${
            videoData.info.keywords[0] + " " + videoData.info.keywords[1]
          }"`
      )
        .then((res) => res.json())
        .then(async (data) => {
          //data.filter((video) => video.id.videoId !== router.query.id);
          setData(data);
          setLoading(false);
        });
    }
  }, [videoData]);

  return (
    <Main>
      <SearchBar />
      <div className="flex justify-start gap-4 font-bold flex-wrap">
        {videoData && (
          <div className="player">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill={constants.colors.primary}
                className="bi bi-box-arrow-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </button>
            {/* <ReactPlayer
              url={videoData.video.url}
              controls={true}
              playing={true}
              width={size.width > 768 ? "60vw" : "100%"}
              height={size.width > 768 ? "60vh" : "30em"}
            /> */}
            <video
              ref={playerRef}
              id="player"
              playsInline={true}
              controls
              data-poster={videoData.info.thumbnails.url}
            >
              <source src={videoData.video.url} type="video/mp4" />
            </video>
            <RWebShare
              data={{
                text: videoData.info.title,
                url: window.location.href,
                title: "Video Blogster",
              }}
            >
              <button className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill={constants.colors.primary}
                  className="bi bi-share-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                </svg>
              </button>
            </RWebShare>
            {user &&
              (videoSaved ? (
                <button
                  className="btn btn-ghost btn-circle"
                  onClick={() => deleteVideoFromSaved()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="grey"
                  >
                    <path d="M4 8H2v12a2 2 0 0 0 2 2h12v-2H4z"></path>
                    <path d="M20 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-9 12V6l7 4z"></path>
                  </svg>
                </button>
              ) : (
                <button
                  className="btn btn-ghost btn-circle"
                  onClick={() => saveVideo()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill={constants.colors.primary}
                  >
                    <path d="M4 8H2v12a2 2 0 0 0 2 2h12v-2H4z"></path>
                    <path d="M20 2H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-9 12V6l7 4z"></path>
                  </svg>
                </button>
              ))}
            {!isDownloading && videoData.video.url ? (
              <>
                <button
                  className="btn btn-ghost btn-circle"
                  onClick={() => download(videoData.video.url)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill={constants.colors.primary}
                    className="bi bi-box-arrow-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <Spinner />
            )}
            <p className="text-xl">{videoData.info.title}</p>
          </div>
        )}
        <div
          className={
            size.width > 768
              ? "playlist-container"
              : "playlist-container-mobile"
          }
        >
          <p>Videos recomendados</p>
          {isLoading ? (
            <Spinner />
          ) : (
            data?.map((item, _index) => (
              <VideoPlayListItem
                id={item.id.videoId}
                title={item.title}
                img={item.snippet.thumbnails.url}
                key={item.id.videoId}
                active={router.query.id === item.id.videoId}
              />
            ))
          )}
        </div>
      </div>
    </Main>
  );
};

export default VideoDetails;
