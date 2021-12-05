import { Row, Col, Typography, Form, Input, Button } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
export default function Contact() {
  const { Title, Text, Link } = Typography;
  const { form } = Form;
  const { TextArea } = Input;
  return (
    <>
      <div className="contact-us_container">
        <Row
          style={{
            border: "1px solid #f3f3f7",
            borderRadius: "5px",
            boxShadow: " 1px 2px 7px -4px rgba(0,0,0,0.75)",
            padding: "1.5rem",
          }}
          gutter={[60, 0]}
        >
          <Col
            span={12}
            align="right"
            style={{
              textAlign: "right",
            }}
          >
            <Title
              style={{
                color: "#333",
              }}
            >
              Contact Us
            </Title>
            <Text
              style={{
                color: "#777",
              }}
            >
              Feel Free to get in touch with us. We am always open to
              discussing, If any problem comes in you can Contact of by filling
              this form.
            </Text>
            <div className="mail-me">
              <MailOutlined
                style={{
                  fontSize: "40px",
                }}
              />
              <Title
                style={{
                  margin: 0,
                }}
                level={5}
              >
                Mail us
              </Title>
              <Text>aayantimalcina@ismt.edu.com</Text>
            </div>
            <div className="mail-me">
              <PhoneOutlined
                style={{
                  fontSize: "40px",
                }}
              />
              <Title
                style={{
                  margin: 0,
                }}
                level={5}
              >
                Call us
              </Title>
              <Text>+977 984154585</Text>
            </div>
          </Col>
          <Col span={12}>
            <Form form={form}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder="Enter your Name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Enter a valid email address" />
              </Form.Item>
              <Form.Item
                name="message"
                rules={[{ required: true, message: "Please input a message!" }]}
              >
                <TextArea placeholder="Enter your Message" />
              </Form.Item>
              <Button type="primary" htmlType="submit" danger>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
      <style jsx>
        {`
          .contact-us_container {
            height: 80vh;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .mail-me {
            margin: 2.5rem 0;
          }
        `}
      </style>
    </>
  );
}
