import Router from "next/router";
import { useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const { pathname } = Router;
        if (pathname != "/") {
            Router.push("/");
        }
    });
    return <Component {...pageProps} />;
}

export default MyApp;
