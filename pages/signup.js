import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Signup from "../components/Signup";
import { useAuthContext } from "../hooks/useAuthContext";

function SignupPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      router.push("/");
    } else if (user == null) {
      console.log("signed in!");
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
      <Signup />
    </Layout>
  );
}

export default SignupPage;
