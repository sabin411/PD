import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Spin } from "antd";
import { useUser } from "@auth0/nextjs-auth0";
import NormUser from "../components/User/NormUser";
import Admin from "../components/User/Admin";
import RegisterUserDrawer from "../components/MainContent/components/AdminComponents/modals/RegisterUserDrawer";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [userDetail, setUserDetail] = useState({});
  const [isDrawerVisibile, setIsDrawerVisible] = useState(false);
  const router = useRouter();
  console.log(user, "user is here");
  // will handle the visibility of add user modal
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };
  const hideDrawer = () => {
    setIsDrawerVisible(false);
  };
  useEffect(() => {
    if (router.query.length > 0) {
      setUserDetail({ ...router.query, type: "admin" });
      return;
    }
    if (localStorage.getItem("user")) {
      setUserDetail({
        ...JSON.parse(localStorage.getItem("user")),
        type: "admin",
      });
      return;
    }
    if (user) {
      setUserDetail({ ...user, type: "admin" });
    }
  }, [user, router.query]);
  console.log(userDetail, user, "baka");
  if (!userDetail.username && !user) {
    return (
      <>
        <div className="login-page_container">
          <div className="wrapper">
            <header>
              <img
                src="https://www.pngkit.com/png/full/85-857706_olympic-rings-white-white-colour-dp-for-whatsapp.png"
                alt=""
              />
            </header>
            <main>
              <h1 className="heading">
                Create Your Own <br />
                Fun Olympic ID
              </h1>
              <h2>
                Personalise your experience with your favourite sports and
                athletes.
              </h2>
              <h2>
                Watch original Olympic content and documentaries for free.
              </h2>
              <h2>
                Get exclusive stories about your favourite Olympic athletes and
                sports into your e-mail inbox.
              </h2>
              <div className="signIn_options">
                <h1>Quickly register with your social network</h1>
                <div className="signIn_optoins-top">
                  <div className="normal-login">
                    <Link href="/login">
                      <a>login</a>
                    </Link>
                  </div>
                  <div className="normal-signup">
                    <button onClick={() => {}}>Register</button>
                  </div>
                </div>
                <div className="google-login">
                  <a href="api/auth/login">
                    <img
                      style={{
                        marginRight: ".5rem",
                      }}
                      src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                      width="30"
                      alt="google logo png suite everything you need know about google newest"
                    />
                    Google
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
        <RegisterUserDrawer
          showDrawer={showDrawer}
          hideDrawer={hideDrawer}
          visible={isDrawerVisibile}
        />
        <style jsx>
          {`
            .login-page_container {
              color: white;
              height: 100vh;
              background-image: linear-gradient(
                  90deg,
                  rgba(0, 0, 0, 0.8113620448179272) 45%,
                  rgba(0, 0, 0, 0.7217261904761905) 68%,
                  rgba(255, 255, 255, 0) 100%
                ),
                url("https://img.olympicchannel.com/images/image/private/t_16-9_1920/f_auto/v1538355600/primary/ru0n30tdik15nffrm3dj");
              background-position: center;
              background-repeat: no-repeat;
              background-size: auto;
            }
            .login-page_container header img {
              height: auto;
              width: 100px;
              padding-bottom: 3.5rem;
            }
            .wrapper {
              max-width: 1300px;
              margin: 0 auto;
              padding: 4rem 0;
            }
            .heading {
              font-size: 75px;
              color: white;
              font-weight: 600;
              line-height: 1em;
              margin-bottom: 4.5rem;
            }
            main h2 {
              color: white;
              margin-bottom: 2.5rem;
            }
            .signIn_options h1 {
              font-size: 28px;
              line-height: 40px;
              color: white;
              margin-top: 4rem;
            }
            .signIn_options a {
              border: 1px solid white;
              background: white;
              padding: 0.5rem 1.5rem;
              font-size: 20px;
              font-weight: 500;
              color: #111;
              border-radius: 5px;
            }
            .signIn_optoins-top {
              display: flex;
              align-items: center;
              margin-top: 2rem;
            }
            .signIn_optoins-top > div:last-child() {
              margin: 0 1.5rem;
            }
            .google-login {
              margin-top: 2.5rem;
            }
          `}
        </style>
      </>
    );
  }
  if (
    (userDetail?.username && userDetail.type === "norm-user") ||
    (user && userDetail.type === "norm-user")
  ) {
    return <NormUser user={userDetail} isLoading={isLoading} />;
  }
  if (
    (userDetail?.username && userDetail.type === "admin") ||
    (user && userDetail.type === "admin")
  ) {
    return <Admin user={userDetail} />;
  }
  if (isLoading) {
    return <Spin />;
  }
}
