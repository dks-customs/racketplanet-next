import { useCookies } from "react-cookie";
import "./gdpr-modal-manage.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";
import ChevronDownSVG from "../../../../../svg/chevron-down";
import useGDPRCookies from "../../../../hooks/useGDPRCookies";
import {
  DISQUS_COOKIE_NAME,
  GA_COOKIE_NAME,
} from "../../../../../../constants/constants";
import cookieExpires from "../../../../../../util/cookieExpires";

type GDPRModalManageProps = {
  setShow: Dispatch<SetStateAction<boolean>>;
};

export default function GDPRModalManage({ setShow }: GDPRModalManageProps) {
  const { googleAnalytics, disqus } = useGDPRCookies();
  const [cookies, setCookie] = useCookies();
  const [showGaDetails, setShowGaDetails] = useState<boolean>(false);
  const [showDisqusDetails, setShowDisqusDetails] = useState<boolean>(false);
  const [disqusSetting, setDisqusSetting] = useState<boolean>(
    disqus ? true : false
  );
  const [gaSetting, setGaSetting] = useState<boolean>(
    googleAnalytics ? true : false
  );

  const toggleGaSetting = () => {
    setGaSetting(!gaSetting);
  };

  const toggleDisqusSetting = () => {
    setDisqusSetting(!disqusSetting);
  };

  const toggleGaDetails = () => {
    setShowGaDetails(!showGaDetails);
  };

  const toggleDisqusDetails = () => {
    setShowDisqusDetails(!showDisqusDetails);
  };

  const rejectAll = () => {
    [GA_COOKIE_NAME, DISQUS_COOKIE_NAME].forEach((cookie) => {
      setCookie(cookie, false, {
        path: "/",
        sameSite: true,
        expires: cookieExpires(),
      });
    });

    setShow(false);
  };

  const acceptAll = () => {
    [GA_COOKIE_NAME, DISQUS_COOKIE_NAME].forEach((cookie) => {
      setCookie(cookie, true, {
        path: "/",
        sameSite: true,
        expires: cookieExpires(),
      });
    });

    setShow(false);
  };

  const saveAndExit = () => {
    setCookie(GA_COOKIE_NAME, gaSetting, {
      path: "/",
      expires: cookieExpires(),
      sameSite: true,
    });

    setCookie(DISQUS_COOKIE_NAME, disqusSetting, {
      path: "/",
      expires: cookieExpires(),
      sameSite: true,
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
            <Form.Check
              type="switch"
              color="secondary"
              id={`gdpr-ga-switch`}
              disabled={false}
              defaultChecked={googleAnalytics ? true : false}
              onChange={toggleGaSetting}
            />
            <button onClick={toggleGaDetails}>
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
            <Form.Check
              type="switch"
              color="secondary"
              id={`gdpr-disqus-switch`}
              disabled={false}
              defaultChecked={disqus ? true : false}
              onChange={toggleDisqusSetting}
            />
            <button onClick={toggleDisqusDetails}>
              <ChevronDownSVG />
            </button>
          </div>
          <Collapse in={showDisqusDetails}>
            <div className="gdpr-section-more">
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
        <Button onClick={rejectAll} variant="secondary">
          Wyłącz wszystkie
        </Button>
        <Button onClick={acceptAll} variant="secondary">
          Akceptuj wszystkie
        </Button>
        <Button onClick={saveAndExit} variant="secondary">
          Zapisz i wyjdź
        </Button>
      </div>
    </div>
  );
}
