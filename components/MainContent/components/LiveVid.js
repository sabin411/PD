import React, { useState, useEffect } from "react";
// import { db } from "../../../firebase/clientApp";
// import { collection, getDocs } from "firebase/firestore";
import { Pagination } from "antd";
import VideoWrapper from "../UiComp/videoWrapper";
import { LiveVideos } from "../../../db/videos";
export default function LiveVid({ isBlock }) {
  const [viewVideo, setViewVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(4);

  const [users, setusers] = useState([]);
  // const usersCollectionRef = collection(db, "users");
  // const liveVideoRef = firebase.firestore();

  useEffect(() => {
    // const getData = async () => {
    //   const data = await getDocs(usersCollectionRef);
    //   console.log(data);
    // };
    // getData();
    setViewVideos(LiveVideos);
  }, []);
  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Pagination
        onChange={onPageChange}
        style={{
          paddingLeft: ".5rem",
          marginBottom: ".5rem",
        }}
        defaultCurrent={1}
        defaultPageSize={4}
        total={50}
      />
      <div
        style={{
          width: "100%",
          justifyContent: "space-between",
          display: "flex",
          gap: ".5rem",
          flexWrap: "wrap",
          padding: "0 .5rem",
          paddingBottom: "2rem",
        }}
      >
        {viewVideo?.map((video, i) => {
          if (
            i < currentPageSize * currentPage &&
            i >= currentPageSize * (currentPage - 1)
          ) {
            return <VideoWrapper key={i} isBlock={isBlock} data={video} />;
          }
        })}
      </div>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { username } = params;
  const profile = await getProfileData(username);
  if (!profile) {
    return { notFound: true };
  }
  return { props: { data: { username, profile } } };
};
