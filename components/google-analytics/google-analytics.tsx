"use client";

import { useEffect } from "react";
import useGDPRCookies from "../gdpr/hooks/useGDPRCookies";
import { usePathname } from "next/navigation";
import { GOOGLE_ANALYTICS_TRACKING_ID } from "../../constants/constants";

export default function GoogleAnalytics() {
  const { googleAnalytics } = useGDPRCookies();
  const pathname = usePathname();

  useEffect(() => {
    if (googleAnalytics === true) {
      try {
        // @ts-ignore
        window.dataLayer = window.dataLayer || [];
        // @ts-ignore
        function gtag() {
          // @ts-ignore
          dataLayer.push(arguments);
        }
        // @ts-ignore
        gtag("js", new Date());
        // @ts-ignore
        gtag("config", GOOGLE_ANALYTICS_TRACKING_ID);
        console.log("pageview sent");
      } catch (err) {
        console.log(err);
        console.log("pageview not sent");
      }
    } else {
      console.log("ga not initialized");
    }
  }, [pathname, googleAnalytics]);

  return null;
}
