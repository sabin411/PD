import React, { useEffect, useState, useRef } from "react";
import { Table, Space, Form } from "antd";
import { LiveVideos } from "../../../../db/videos";
import EditModal from "./modals/EditModal";
export default function LiveVid() {
  const [specificData, setSpecificData] = useState({});
  const [vidData, setVidData] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    setVidData(LiveVideos);
  }, []);
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "link",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "channel",
      dataIndex: "channel",
      key: "channel",
    },
    {
      title: "avatar",
      dataIndex: "avatar",
      key: "avatar",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <a
              onClick={() => {
                const updatedSpecificData = record;
                setSpecificData(updatedSpecificData);
                setTimeout(() => {
                  setModalIsVisible(true);
                }, 100);
              }}
            >
              Edit {record.name}
            </a>
            <a>Delete</a>
          </Space>
        );
      },
    },
  ];
  const [form] = Form.useForm();

  const data = vidData;
  const handleOk = () => {
    setModalIsVisible(false);
    setSpecificData({});
  };
  const handleCancel = () => {
    setModalIsVisible(false);
    setSpecificData({});
    form.resetFields();
  };
  return (
    <>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <EditModal
        form={form}
        visible={modalIsVisible}
        datas={specificData}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
}
