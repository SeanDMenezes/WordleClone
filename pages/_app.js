import Router from "next/router";
import { useEffect } from "react";

// redux
import { Provider } from "react-redux";
import { store } from "./../src/redux/store";

// styling
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        const { pathname } = Router;
        if (pathname != "/") {
            Router.push("/");
        }
    });
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
