import { Metadata } from "next";
import { nunito } from "./fonts";
import { CANONICAL_BASE } from "../constants/constants";
import Header from "../components/header/header";
import getCategories from "../graphql/getCategories";
import getSports from "../graphql/getSports";
import Footer from "../components/footer/footer";
import { ToastContainer } from "react-toastify";

import "../styles/global.scss";
import "react-toastify/dist/ReactToastify.css";
import getEvents from "../graphql/getEvents";
import eventsUtils from "../util/eventsUtils";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  const sports = await getSports();
  const events = await getEvents();
  const widgetEvents = events.filter(eventsUtils.isFutureEvent).slice(0, 3);

  return (
    <html lang="pl" className={nunito.className}>
      <body>
        <Header categories={categories} sports={sports} events={widgetEvents} />
        {children}
        <Footer categories={categories} sports={sports} />
        <ToastContainer theme="colored" position="bottom-center" />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_BASE),
  alternates: {
    canonical: "/",
  },
  themeColor: "#fff",
};
