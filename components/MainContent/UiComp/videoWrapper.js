import { Card, Avatar, Input, Divider, Form, Button, message } from "antd";
import { useEffect, useState } from "react";
import cuid from "cuid";
import Image from "next/image";
import { CheckCircleTwoTone } from "@ant-design/icons";
import axios from "axios";

export default function VideoWrapper({
  videoType,
  data,
  isBlock,
  videoStatus,
}) {
  const { Meta } = Card;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [specificComment, setSpecificComment] = useState([]);
  // to get comments
  const getComments = async () => {
    await axios.get(`http://localhost:8000/${videoType}`).then((res) => {
      setSpecificComment([...res.data]);
    });
  };
  useEffect(() => {
    getComments();
  }, []);

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const onFinish = async (value) => {
    await axios
      .post(`http://localhost:8000/${videoType}`, {
        id: cuid(),
        vidId: data.id,
        videoType: `${videoType}`,
        comment: value.comment,
      })
      .then(() => {
        form.resetFields();
        getComments();
      });
  };
  return (
    <>
      <Card
        style={{ flex: 1, minWidth: "49%" }}
        cover={
          <a href="https://www.youtube.com/embed/EMu8K0l8ggA">
            <iframe
              width="100%"
              height="350px"
              src={`https://www.youtube.com/embed/${data.link}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          </a>
        }
      >
        <Meta
          avatar={
            <Avatar
              src={data.avatar ?? "../../../public/Olympics_logo_PNG8.png"}
            />
          }
          title={data.title}
        />
        <span className="channel">
          {data.channel} <CheckCircleTwoTone twoToneColor="#2d728f" />{" "}
        </span>
        <button onClick={handleVisibility} className="comments">
          Comments
        </button>
        <div
          className={`comment-wrapper ${isVisible ? "active" : ""}`}
          style={{ width: "100%" }}
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              name="comment"
              style={{
                marginBottom: ".5rem",
              }}
            >
              <TextArea
                disabled={isBlock}
                showCount
                maxLength={100}
                placeholder="Add a public comment..."
              />
            </Form.Item>
            <Form.Item
              style={{
                marginBottom: ".5rem",
              }}
            >
              <Button disabled={isBlock} htmlType="submit" type="primary">
                Comment
              </Button>
              <Button
                disabled={isBlock}
                onClick={() => {
                  form.resetFields();
                }}
                style={{
                  marginLeft: ".5rem",
                }}
                danger
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
          <Divider
            style={{
              margin: ".5rem 0",
            }}
          />
          {specificComment?.map((comment) => {
            if (comment.vidId === data.id) {
              return (
                <>
                  <div key={comment.id}>
                    <Avatar
                      icon={<Image src="/default.png" width="50" height="50" />}
                    />
                    <h3 style={{ marginLeft: ".3rem" }}>{comment.user}</h3>
                    <p>{comment.comment}</p>
                  </div>

                  <Divider
                    style={{
                      margin: ".5rem 0",
                    }}
                  />
                </>
              );
            }
          })}
        </div>
      </Card>
      <style jsx>
        {`
          .channel {
            font-weight: normal;
          }
          .comments {
            margin-left: 0.5rem;
            background: transparent;
            border: none;
            font-size: 16px;
            font-weight: 500;
            text-decoration: underline;
            cursor: pointer;
          }
          .comments:hover {
            color: #999;
          }
          .comment-wrapper {
            transform: scaleY(0);
            transition: 0.3s ease-out;
            transform-origin: top;
            max-height: 0;
          }
          .comment-wrapper.active {
            transform: scaleY(1);
            display: flex;
            flex-direction: column;
            max-height: 300px;
            overflow-y: scroll;
          }
          .comment-wrapper {
            margin-top: 1rem;
          }
          .comment-wrapper.active div h3,
          .comment-wrapper.active div p {
            opacity: 1;
          }
          .comment-wrapper div h3,
          .comment-wrapper div p {
            opacity: 0;
          }
          .comment-wrapper div {
            display: flex;
            align-items: center;
          }
          .comment-wrapper h3 {
            font-weight: 600;
            margin-bottom: 0;
          }
          .comment-wrapper p {
            margin-bottom: 0;
            margin-left: 0.5rem;
          }
        `}
      </style>
    </>
  );
}
