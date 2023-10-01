import { Metadata } from "next";
import { nunito } from "./fonts";
import { CANONICAL_BASE } from "../constants/constants";
import "../styles/index.scss";
import Header from "../components/header/header";
import Footer from "../components/footer";
import getCategories from "../api/getCategories";
import getSports from "../api/getSports";
import getWidgetEvents from "../api/getWidgetEvents";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  const sports = await getSports();
  const widgetEvents = await getWidgetEvents();

  console.log(widgetEvents);

  return (
    <html lang="pl" className={nunito.className}>
      <body>
        <Header />
        {children}
        <Footer />
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
