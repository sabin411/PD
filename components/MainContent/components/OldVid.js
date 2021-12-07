import React, { useEffect, useState } from "react";
import VideoWrapper from "../UiComp/videoWrapper";
import axios from "axios";
import { Pagination } from "antd";
export default function OldVid() {
  const [viewVideo, setViewVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(4);
  const [prevCurrentPage, setPrevCurrentPage] = useState(0);
  const videoStatus = "OldVideos";

  useEffect(() => {
    axios.get(`http://localhost:8000/OldVideos`).then((res) => {
      setViewVideos(res.data);
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
        total={20}
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
            return (
              <VideoWrapper
                videoStatus={videoStatus}
                key={i}
                isBlock={true}
                data={video}
              />
            );
          }
        })}
      </div>
    </>
  );
}
