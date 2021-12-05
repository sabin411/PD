import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import NormUser from "../components/User/NormUser";
import Admin from "../components/User/Admin";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    setUserDetail({ ...user, type: "admin" });
  }, [user]);

  if (!user) {
    return (
      <div>
        <h3>Please log in first</h3>
        <a href="api/auth/login">login</a>
      </div>
    );
  }
  if (user && userDetail.type === "norm-user") {
    return <NormUser user={userDetail} isLoading={isLoading} />;
  }
  if (user && userDetail.type === "admin") {
    return <Admin user={userDetail} />;
  }
  if (isLoading) {
    return <Spin />;
  }
}
