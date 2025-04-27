import { FC } from "react";
import { createPortal } from "react-dom";

type PhoneModalProps = {
  onClose: () => void;
};

export const PhoneModal: FC<PhoneModalProps> = ({ onClose }) => {
  return createPortal(
    <div className="phone-modal-backdrop">
      <div className="phone-modal">
        <p>Phone Modal </p>
        <button onClick={onClose}>Close</button>
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
