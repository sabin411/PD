import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
export default function Login() {
  const onFinish = async (values) => {};

  return (
    <>
      <div
        className="form-wrapper"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="form-container" style={{ width: 400, height: "auto" }}>
          <h3>Login</h3>
          <Form
            style={{
              marginTop: 20,
            }}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a
                style={{
                  display: "inline-block",
                  marginLeft: "1.3rem",
                }}
                className="login-form-forgot"
                href=""
              >
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                style={{
                  display: "inline-block",
                  marginRight: "1.3rem",
                }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
      <style jsx>
        {`
          .form-container {
            border: 1px solid gray;
            padding: 2rem 2rem;
            border-radius: 10px;
          }
          .form-container h3 {
            font-size: 23px;
            font-weight: 600;
            margin-bottom: 1rem;
            text-align: center;
          }
        `}
      </style>
    </>
  );
}
