import { Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
export default function Login() {
  const [totalUsers, setTotalUsers] = useState();
  const [userId, setUserId] = useState(0);
  const [authorizedUser, setAuthorizedUsere] = useState();
  const router = useRouter();
  useEffect(() => {
    axios.get("http://localhost:8000/users").then((res) => {
      setTotalUsers([...res.data]);
    });
  }, []);
  const finishHandler = async (values) => {
    totalUsers.forEach((item) => {
      if (item.email === values.email && item.password === values.password) {
        setAuthorizedUsere(item);
        localStorage.setItem("user", JSON.stringify(item));
        router.push({
          pathname: "/",
          query: { ...item },
        });
      }
    });
  };
  console.log(totalUsers);
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card title="Login" bordered={false} style={{ width: 450 }}>
          <Form
            onFinish={finishHandler}
            style={{
              marginTop: 20,
            }}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
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
                <Checkbox rules={[{ required: true }]}>Remember me</Checkbox>
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
        </Card>
      </div>

      <style jsx>
        {`
          .site-card-border-less-wrapper {
            background-color: #ececec;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
}
