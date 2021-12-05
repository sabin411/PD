import { Modal, Input, InputNumber, Button, Form } from "antd";
import React, { useState, useEffect, useRef } from "react";
import LiveVideos from "../../../../../db/videos";

export default function EditModal({
  form,
  datas,
  visible,
  handleOk,
  handleCancel,
}) {
  const [updatedData, setUpdatedData] = useState({});
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const onFinish = (values) => {
    // setUpdatedData(values);
    console.log(LiveVideos);
    LiveVideos.forEach((video, index) => {
      console.log(video.id, datas.id);
      if (video.id === datas.id) {
        LiveVideos.splice(index, 0);
        LiveVideos.push(values);
      }
    });
    console.log(values, "finished");
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  return (
    <Modal
      title="Edit"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        style={{}}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          initialValue={datas.title}
          name={"Title"}
          label="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={datas.link}
          name={"link"}
          label="Link"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          initialValue={datas.channel}
          name={"channel"}
          label="Channel"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item initialValue={datas.avatar} name={"avatar"} label="Avatar">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Update
          </Button>
          <Button
            onClick={handleCancel}
            style={{ marginLeft: "0.5rem" }}
            type="default"
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
