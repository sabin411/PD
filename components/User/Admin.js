import { useState } from "react";
import Header from "../MainContent/UiComp/Header";
import { Layout } from "antd";
import MainAdminSection from "./MainAdminSection";
export default function NormUser({ user, isLoading }) {
  const { Main, Footer, Content } = Layout;
  const [isBlock, setIsBlock] = useState(false);

  console.log(user, isLoading);
  const myLoader = ({ src, width, quality }) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
  };

  if (user) {
    return (
      <>
        <main className="dashboard-container header container">
          <Header user={user} />
        </main>
        <section className="container content-container">
          <MainAdminSection />
        </section>
        <style jsx>
          {`
            @import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
            .container {
              max-width: 1300px !important;
              margin: 0 auto;
            }
            .content-container {
              width: 100%;
            }
            .header {
              padding: 0.5rem 0;
            }
            .main-middle h1 {
              font-family: "Lobster", cursive;
              font-size: 28px;
            }
            .main-middle h3 {
              color: #888;
              font-size: 19px;
            }
            .logout-btn {
              color: ;
            }
            .dashboard-container {
              max-width: 1300px;
              margin: 0 auto;
            }
          `}
        </style>
      </>
    );
  }
}
