import React from "react";
import Image from "next/image";
import { Menu, Row, Col, Dropdown } from "antd";

export default function Header({ user }) {
  console.log(user);
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          rel="noopener noreferrer"
          href="/api/auth/logout"
          onClick={() => {
            localStorage.removeItem("user");
          }}
        >
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Row
        align="start"
        style={{
          height: "auto",
        }}
      >
        <Col
          align="middle"
          justify="center"
          style={{
            display: "grid",
            alignItems: "center",
          }}
          span={8}
        >
          <div
            className="logo-wrapper"
            style={{
              display: "grid",
              height: "auto",
              placeContent: "start",
              alignItems: "center",
            }}
          >
            <Image
              src="/Olympics_logo_PNG8.png"
              alt="Picture of the author"
              width={100}
              height={70}
            />
          </div>
        </Col>
        <Col
          align="middle"
          style={{
            display: "grid",
            placeContent: "center",
          }}
          span={8}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="main-middle"
          >
            <h1>
              <span
                style={{
                  color: "#0085C7",
                }}
              >
                Fun
              </span>
              <span
                style={{
                  color: "#F4C300",
                }}
              >
                Ol
              </span>
              <span
                style={{
                  color: "#009F3D",
                }}
              >
                ym
              </span>
              <span
                style={{
                  color: "#DF0024",
                }}
              >
                pic
              </span>
            </h1>
            <h3>City of Tokyo</h3>
          </div>
        </Col>
        <Col
          className="profile-container"
          align="bottom"
          style={{
            display: "grid",
            alignItems: "center",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
          span={8}
        >
          <Dropdown overlay={menu} placement="bottomLeft" arrow>
            <div className="profile-name-pic_wrapper">
              <div
                style={{
                  display: "grid",
                  placeItems: "end",
                }}
                className="user-profile"
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  src={user?.picture ?? "/default.png"}
                  alt=""
                />{" "}
              </div>
              <span className="username-name">
                {user?.given_name ?? "User"}
              </span>
            </div>
          </Dropdown>
        </Col>
      </Row>
      <style jsx>
        {`
          .user-profile {
            object-fit: cover;
            height: 40px;
            width: 40px;
            overflow: hidden;
            border-radius: 50%;
          }
          .profile-name-pic_wrapper {
            cursor: pointer;
            border-radius: 30px;
            padding: 0.3rem 0.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.3s ease-out;
          }
          .profile-name-pic_wrapper:hover {
            background-color: #f4f6f5;
          }
          .profile-name-pic_wrapper:active {
            filter: brightness(120%);
          }
          .profile-name-pic_wrapper .username-name {
            font-size: 17px;
            color: #333;
            margin-left: 0.5rem;
          }
        `}
      </style>
    </>
  );
}
