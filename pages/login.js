import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Login from "../components/Login";
import { useRouter } from "next/router";
import { useAuthContext } from "../hooks/useAuthContext";

function LoginPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      router.push("/");
    } else if (user == null) {
      console.log("signed in please!");
    }
    // return () => {};
  }, [user]);

  if (user) {
    // user is signed out or still being checked.
    // don't render anything
    return null;
  }
  return (
    <Layout>
      <Login />
    </Layout>
  );
}

export default LoginPage;
