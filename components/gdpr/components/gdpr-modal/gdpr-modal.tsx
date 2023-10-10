import { Dispatch, SetStateAction, useState } from "react";
import { Modal } from "react-bootstrap";
import GDPRModalConsent from "./components/gdpr-modal-consent/gdpr-modal-consent";
import GDPRModalManage from "./components/gdpr-modal-manage/gdpr-modal-manage";
import useGDPRCookies from "../../hooks/useGDPRCookies";

type GDPRModalProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  initialMode: "consent" | "manage";
};

export default function GDPRModal({
  show,
  initialMode,
  setShow,
}: GDPRModalProps) {
  const [mode, setMode] = useState<"consent" | "manage">(initialMode);
  const { areCookiesValid } = useGDPRCookies();

  return (
    <Modal
      className="gdpr-modal"
      dialogClassName="gdpr-modal-dialog"
      contentClassName="gdpr-modal-content"
      centered
      onHide={() => setShow(false)}
      show={show}
      backdrop={mode === "consent" ? "static" : true}
    >
      <Modal.Header closeButton={areCookiesValid() && mode === "manage"} />
      <Modal.Body>
        {mode === "consent" && (
          <GDPRModalConsent
            toggleManage={() => setMode("manage")}
            setShow={setShow}
          />
        )}
        {mode === "manage" && <GDPRModalManage setShow={setShow} />}
      </Modal.Body>
    </Modal>
  );
}
