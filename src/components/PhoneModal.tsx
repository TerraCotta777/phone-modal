import { FC, useState } from "react";
import { createPortal } from "react-dom";
import { PhoneInput } from "./PhoneInput";

type PhoneModalProps = {
  onClose: () => void;
};

export const PhoneModal: FC<PhoneModalProps> = ({ onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [savedPhone, setSavedPhone] = useState('');

  const handleSave = (phone: string) => {
    localStorage.setItem('userPhone', phone);
    setSavedPhone(phone);
    setIsSuccess(true);
  };

  return createPortal(
    <div className="phone-modal-backdrop">
      <div className="phone-modal">
        {!isSuccess ? (
          <PhoneInput onSave={handleSave} />
        ) : (
          <div>
            <p>Phone number saved successfully!</p>
            <p>Your phone number: {savedPhone}</p>
            <button onClick={onClose}>Close</button>
          </div>
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
