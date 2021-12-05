import { Card, Avatar, Input, Divider, Form, Button, message } from "antd";
import { useState } from "react";
import Image from "next/image";
import { CheckCircleTwoTone } from "@ant-design/icons";

export default function VideoWrapper({ data, isBlock }) {
  const { Meta } = Card;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);
  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const onFinish = (value) => {
    console.log(value);
    message.success("Submit success!");
    form.resetFields();
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
          {data.comments?.length} Comment
          {data.comments?.length === 1 ? "" : "s"}
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
          {data.comments?.map((comment) => (
            <>
              <div>
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
          ))}
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
