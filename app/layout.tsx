import { Metadata } from "next";
import { nunito } from "./fonts";
import { CANONICAL_BASE } from "../constants/constants";
import "../styles/index.scss";
import Header from "../components/header/header";
import getCategories from "../api/getCategories";
import getSports from "../api/getSports";
import getWidgetEvents from "../api/getWidgetEvents";
import Footer from "../components/footer/footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  const sports = await getSports();
  const widgetEvents = await getWidgetEvents();

  return (
    <html lang="pl" className={nunito.className}>
      <body>
        <Header categories={categories} sports={sports} events={widgetEvents} />
        {children}
        <Footer categories={categories} sports={sports} />
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
