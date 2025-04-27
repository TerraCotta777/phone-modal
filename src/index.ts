import React from 'react';
import { createRoot, Root } from "react-dom/client";
import { PhoneModal } from './PhoneModal';

let root: Root | null = null;

export async function setPhone(): Promise<string> {
  return new Promise((resolve) => {
    const container = getContainer();

    const handleClose = () => {
      root?.unmount();
      resolve("mock-phone");
    };

    if (!root) {
      root = createRoot(container);
    }

    root.render(React.createElement(PhoneModal, { onClose: handleClose }));
  });
}

function getContainer(): HTMLElement {
  let el = document.getElementById("phone-modal-container");
  if (!el) {
    el = document.createElement("div");
    el.id = "phone-modal-container";
    document.body.appendChild(el);
  }
  return el;
}
