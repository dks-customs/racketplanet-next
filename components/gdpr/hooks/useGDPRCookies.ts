import { useCookies } from "react-cookie";
import {
  DISQUS_COOKIE_NAME,
  GA_COOKIE_NAME,
} from "../../../constants/constants";

export default function useGDPRCookies() {
  const [cookies] = useCookies([DISQUS_COOKIE_NAME, GA_COOKIE_NAME]);

  const googleAnalytics = [true, false].includes(cookies[GA_COOKIE_NAME])
    ? cookies[GA_COOKIE_NAME]
    : null;

  const disqus = [true, false].includes(cookies[DISQUS_COOKIE_NAME])
    ? cookies[DISQUS_COOKIE_NAME]
    : null;

  const areCookiesValid = () => {
    if (disqus === null || googleAnalytics === null) {
      return false;
    } else {
      return true;
    }
  };

  return {
    areCookiesValid,
    googleAnalytics,
    disqus,
  };
}
