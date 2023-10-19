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
    <div className="gdpr">
      <div className="gdpr__title">Cenimy Twoją prywatność</div>
      <div className="gdpr__content">
        <p className="gdpr__content__desc">
          My i nasi partnerzy używamy cookies i podobnych technologii
          ("Cookies") aby przetwarzać niektóre informacje, takie jak adresy IP i
          cyfrowe identyfikatory aby analizować poczynania użytkowników na
          stronie i zapewnić Ci zawartość jak najwyższej jakości. My i nasi
          partnerzy używamy tych cookies do następujących celów:
        </p>
        <div className="gdpr__content__sections">
          <div className="gdpr-section-header">
            <span>Analiza ruchu</span>
            <button
              onClick={toggleGaDetails}
              className="gdpr-section-header__more-btn"
            >
              <ChevronDownSVG />
            </button>
          </div>
          <Collapse in={showGaDetails}>
            <div className="gdpr-section-more">
              <p>
                Używamy Google Analytics do zbierania informacji m.in. o tym
                które strony są najczęściej odwiedzane oraz profilowania naszych
                użytkowników w celu jak najlepszego dopasowania treści do Twoich
                potrzeb.
              </p>
            </div>
          </Collapse>
          <div className="gdpr-section-header">
            <span>Komentowanie artykułów</span>
            <button
              onClick={toggleDisqusDetails}
              className="gdpr-section-header__more-btn"
            >
              <ChevronDownSVG />
            </button>
          </div>
          <Collapse in={showDisqusDetails}>
            <div className="gdpr-section-more">
              <p>
                Używamy systemu komentarzy Disqus w celu umożliwienia
                użytkownikom komentowania treści artykułów. Szczegółowy opis
                cookies wykorzystywanych przez Disqus znajduje się w linku
                poniżej:&nbsp;
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
        <p className="gdpr__content__desc">
          Szczegółowy opis tego jakich cookies (oraz w jaki sposób) używamy my i
          nasi partnerzy znajdziesz w naszej Polityce Prywatności.
        </p>
        <p className="gdpr__content__desc">
          Klikając "Akceptuję", zgadzasz się na przetwarzanie Twoich danych
          osobowych przez nas i naszych partnerów do wszystkich celów
          wymienionych powyżej. Możesz też dokonać wyboru które dane my i nasi
          partnerzy możemy przetwarzać klikając "Zarządzaj cookies".
        </p>
        <p className="gdpr__content__desc">
          W każdej chwili możesz zmienić zdanie klikając "Zarządzaj cookies" w
          stopce naszej strony.
        </p>
      </div>
      <div className="gdpr__buttons">
        <Button onClick={toggleManage} variant="secondary">
          Zarządzaj cookies
        </Button>
        <Button onClick={accept} variant="secondary">
          Akceptuję
        </Button>
      </div>
    </div>
  );
}
