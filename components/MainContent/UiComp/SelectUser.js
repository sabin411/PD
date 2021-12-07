import React, { useState } from "react";
import { Modal, Button } from "antd";
import { Radio, Form } from "antd";
export default function SelectUser({ isModalVisible, handleOk, handleCancel }) {
  const [value, setValue] = React.useState("admin");

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <Modal
      title="Select User Type"
      onOk={() => {
        handleOk(value);
      }}
      onCancel={handleCancel}
      visible={isModalVisible}
    >
      <Radio.Group onChange={onChange} value={value}>
        <Radio name="radio-group" value="admin">
          Admin
        </Radio>
        <Radio name="radio-group" value="norm-user">
          Normal
        </Radio>
      </Radio.Group>
    </Modal>
  );
}
