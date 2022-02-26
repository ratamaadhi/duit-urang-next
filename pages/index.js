import { useRouter } from "next/router";
import { useEffect } from "react";
import HomeScreen from "../components/HomeScreen";
import Layout from "../components/Layout";
import MainScreen from "../components/MainScreen";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();
  // useEffect(() => {
  //   if (user) {
  //     console.log("signed in!");
  //   } else if (user == null) {
  //     router.push("/login");
  //   }
  //   return () => {};
  // }, [user]);

  return (
    <Layout>
      {!user ? 
        <HomeScreen />
      :
        <MainScreen />
      }
    </Layout>
  );
}
