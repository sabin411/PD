import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "antd";
import VideoWrapper from "../UiComp/videoWrapper";
import { LiveVideos } from "../../../db/videos";
export default function LiveVid({ isBlock }) {
  const [viewVideo, setViewVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(4);
  const [comments, setComments] = useState([{ comment: "nothing to show" }]);
  const [users, setusers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/LiveVideos").then((res) => {
      setViewVideos(res.data);
    });
    axios.get(" http://localhost:8000/LiveVideosComments").then((res) => {
      setComments([res.data]);
    });
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
        {viewVideo &&
          viewVideo?.map((video, i) => {
            if (
              i < currentPageSize * currentPage &&
              i >= currentPageSize * (currentPage - 1)
            ) {
              return (
                <VideoWrapper
                  comments={comments.filter((comment) => {
                    if (comment.videoId === video.id) {
                      return true;
                    }
                    return false;
                  })}
                  key={i}
                  isBlock={isBlock}
                  data={video}
                />
              );
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
