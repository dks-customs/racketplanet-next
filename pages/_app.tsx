import { AppProps } from "next/app";
/* The following line can be included in a src/App.scss */
import "../styles/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
