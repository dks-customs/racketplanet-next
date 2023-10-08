import { Dispatch, SetStateAction, useState } from "react";
import "./gdpr-modal-consent.scss";
import { Button, Collapse } from "react-bootstrap";
import {
  DISQUS_COOKIE_NAME,
  GA_COOKIE_NAME,
} from "../../../../../../constants/constants";
import { useCookies } from "react-cookie";
import ChevronDownSVG from "../../../../../svg/chevron-down";
import cookieExpires from "../../../../../../util/cookieExpires";

type GDPRModalConsentProps = {
  toggleManage: () => void;
  setShow: Dispatch<SetStateAction<boolean>>;
};

export default function GDPRModalConsent({
  toggleManage,
  setShow,
}: GDPRModalConsentProps) {
  const [cookies, setCookie] = useCookies();
  const [showGaDetails, setShowGaDetails] = useState<boolean>(false);
  const [showDisqusDetails, setShowDisqusDetails] = useState<boolean>(false);

  const toggleGaDetails = () => {
    setShowGaDetails(!showGaDetails);
  };

  const toggleDisqusDetails = () => {
    setShowDisqusDetails(!showDisqusDetails);
  };

  const accept = () => {
    [GA_COOKIE_NAME, DISQUS_COOKIE_NAME].forEach((cookie) => {
      setCookie(cookie, true, {
        path: "/",
        sameSite: true,
        expires: cookieExpires(),
      });
    });

    setShow(false);
  };

  return (
    <div>
      <div>Cenimy Twoją prywatność</div>
      <div>
        <p>
          My i nasi partnerzy używamy cookies i podobnych technologii
          ("Cookies") aby przetwarzać niektóre informacje, takie jak adresy IP i
          cyfrowe identyfikatory aby analizować poczynania użytkowników na
          stronie i zapewnić Ci zawartość jak najwyższej jakości. My i nasi
          partnerzy używamy tych cookies do następujących celów:
        </p>
        <div>
          <div>
            <div>
              Analiza ruchu
              <button onClick={toggleGaDetails}>
                <ChevronDownSVG />
              </button>
            </div>
            <Collapse in={showGaDetails}>
              <div>
                <p>
                  Używamy Google Analytics do zbierania informacji m.in. o tym
                  które strony są najczęściej odwiedzane oraz profilowania
                  naszych użytkowników w celu jak najlepszego dopasowania treści
                  do Twoich potrzeb.
                </p>
              </div>
            </Collapse>
          </div>
          <div>
            <div>
              Komentowanie artykułów
              <button onClick={toggleDisqusDetails}>
                <ChevronDownSVG />
              </button>
            </div>
            <Collapse in={showDisqusDetails}>
              <div>
                <p>
                  Używamy systemu komentarzy Disqus w celu umożliwienia
                  użytkownikom komentowania treści artykułów. Szczegółowy opis
                  cookies wykorzystywanych przez Disqus znajduje się w linku
                  poniżej:
                  <a
                    href="https://help.disqus.com/en/articles/1717155-use-of-cookies"
                    target="_blank"
                    className="gdpr-link gdpr-link--newline"
                  >
                    Use of Cookies - Disqus
                  </a>
                </p>
              </div>
            </Collapse>
          </div>
        </div>
        <p>
          Szczegółowy opis tego jakich cookies (oraz w jaki sposób) używamy my i
          nasi partnerzy znajdziesz w naszej Polityce Prywatności.
        </p>
        <p>
          Klikając "Akceptuję", zgadzasz się na przetwarzanie Twoich danych
          osobowych przez nas i naszych partnerów do wszystkich celów
          wymienionych powyżej. Możesz też dokonać wyboru które dane my i nasi
          partnerzy możemy przetwarzać klikając "Zarządzaj cookies".
        </p>
        <p>
          W każdej chwili możesz zmienić zdanie klikając "Zarządzaj cookies" w
          stopce naszej strony.
        </p>
      </div>
      <div>
        <Button onClick={toggleManage} variant="primary">
          Zarządzaj cookies
        </Button>
        <Button onClick={accept} variant="primary">
          Akceptuję
        </Button>
      </div>
    </div>
  );
}
