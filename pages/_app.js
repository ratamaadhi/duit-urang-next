import Head from "next/head";
import { useEffect } from "react";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document
      .querySelector("html")
      .classList.add(localStorage.getItem("theme") || "light");
  }, []);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href={"favicon.ico"} />
        <title>Duit Urang</title>
      </Head>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
