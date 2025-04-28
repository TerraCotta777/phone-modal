import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PhoneInput } from "./PhoneInput";
import { SuccessScreen } from "./SuccessScreen";
type PhoneModalProps = {
  onClose: () => void;
};

export const PhoneModal: FC<PhoneModalProps> = ({ onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedPhone, setSavedPhone] = useState("");

  useEffect(() => {
    const existingPhone = localStorage.getItem("userPhone");
    if (existingPhone) {
      setSavedPhone(existingPhone);
      setIsSuccess(true);
    }
  }, []);

  const handleSave = (phone: string) => {
    localStorage.setItem("userPhone", phone);
    setSavedPhone(phone);
    setIsSuccess(true);
  };

  const handleClose = () => {
    onClose();
  };

  return createPortal(
    <div className="phone-modal-backdrop">
      <div className="phone-modal">
        {isSuccess ? (
          <SuccessScreen phone={savedPhone} onClose={handleClose} />
        ) : (
          <PhoneInput onSave={handleSave} />
        )}
      </div>
    </div>,
    getModalRoot()
  );
};

function getModalRoot(): HTMLElement {
  let modalRoot = document.getElementById("phone-modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = "phone-modal-root";
    document.body.appendChild(modalRoot);
  }
  return modalRoot;
}
