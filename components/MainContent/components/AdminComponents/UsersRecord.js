import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Button,
  Form,
  Typography,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import RegisterUserDrawer from "../AdminComponents/modals/RegisterUserDrawer";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function EditableTable() {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [originData, setOriginalData] = useState([]);
  const [isDrawerVisibile, setIsDrawerVisible] = useState(false);
  let mappedDAta = [];
  useEffect(() => {
    axios.get(" http://localhost:8000/users").then((res) => {
      res.data.forEach((item, i) => {
        let conservedId = item.id;
        delete item.id;
        mappedDAta.push({ sn: i + 1, ...item, id: conservedId });
      });
      mappedDAta && setData(mappedDAta);
    });
  }, []);

  const refresh = () => {
    mappedDAta = [];
    axios.get(" http://localhost:8000/users").then((res) => {
      res.data.forEach((item, i) => {
        let conservedId = item.id;
        delete item.id;
        mappedDAta.push({ sn: i + 1, ...item, id: conservedId });
      });
      mappedDAta && setData(mappedDAta);
    });
  };

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };
  // handles save function
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        // !posting data into json database
        await axios.put(`http://localhost:8000/users/${id}`, newData[index]);
        // This is worst code ever do not try this this is a reminder for myself.
        // await axios
        //   .delete(`http://localhost:8000/users/${id}`)
        //   .then(axios.post(`http://localhost:8000/users`, ...newData));
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      message.error(errInfo);
    }
  };
  // handles delete function
  const handleDelete = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        // !posting data into json database
        await axios
          .delete(`http://localhost:8000/users/${newData[index].id}`)
          .then(() => {
            newData.splice(index, 1);
            setData(newData);
            setEditingKey("");
          });
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      message.error(errInfo);
    }
  };
  // will handle the visibility of add user modal
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };
  const hideDrawer = () => {
    setIsDrawerVisible(false);
  };

  const columns = [
    {
      title: "S.N",
      dataIndex: "sn",
      width: "5%",
      editable: false,
    },
    {
      title: "UserName",
      dataIndex: "username",
      width: "15%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "40%",
      editable: true,
    },
    {
      title: "country",
      dataIndex: "country",
      width: "30%",
      editable: true,
    },
    {
      title: "Password",
      dataIndex: "password",
      width: "30%",
      editable: false,
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "50%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>{" "}
            {/* <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => {
                handleDelete(record.id);
              }}
            >
              delete
            </Typography.Link> */}
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <a>Delete</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
      <Button
        onClick={showDrawer}
        style={{
          marginBottom: "1.5rem",
        }}
        type="primary"
        icon={<PlusOutlined />}
      >
        Add User
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      <RegisterUserDrawer
        refreshTable={refresh}
        showDrawer={showDrawer}
        hideDrawer={hideDrawer}
        visible={isDrawerVisibile}
      />
    </>
  );
}
