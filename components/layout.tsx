import Footer from "./footer";
import Header from "./header";

export default function Layout({ preview, children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
