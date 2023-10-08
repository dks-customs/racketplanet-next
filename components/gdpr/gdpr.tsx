"use client";

import { useEffect, useState } from "react";
import "./gdpr.scss";
import useGDPRCookies from "./hooks/useGDPRCookies";
import GDPRModal from "./components/gdpr-modal/gdpr-modal";

export default function GDPR() {
  const [show, setShow] = useState(false);
  const { areCookiesValid } = useGDPRCookies();

  useEffect(() => {
    if (navigator.cookieEnabled && !areCookiesValid()) {
      setShow(true);
    }
  }, []);

  return (
    <>
      <button onClick={() => setShow(true)}>Zarządzaj cookies</button>
      <GDPRModal
        show={show}
        setShow={setShow}
        initialMode={!areCookiesValid() ? "consent" : "manage"}
      />
    </>
  );
}
