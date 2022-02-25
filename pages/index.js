import { useRouter } from "next/router";
import { useEffect } from "react";
import HomeScreen from "../components/HomeScreen";
import Layout from "../components/Layout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      console.log("signed in!");
    } else if (user == null) {
      router.push("/login");
    }
  }, [user]);

  if (!user) {
    // user is signed out or still being checked.
    // don't render anything
    return null;
  }

  return (
    <Layout>
      <HomeScreen/>
    </Layout>
  )
}
