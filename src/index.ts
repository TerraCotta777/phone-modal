import React from "react";
import { createRoot, Root } from "react-dom/client";
import { PhoneModal } from "./components/PhoneModal";

let root: Root | null = null;
let currentPromise: Promise<string> | null = null;

export async function setPhone(): Promise<string> {
  if (currentPromise) {
    return currentPromise;
  }

  currentPromise = new Promise((resolve) => {
    const container = getContainer();

    const handleClose = () => {
      const savedPhone = localStorage.getItem("userPhone") || "";
      root?.unmount();
      currentPromise = null;
      resolve(savedPhone);
    };

    if (!root) {
      root = createRoot(container);
    }

    root.render(React.createElement(PhoneModal, { onClose: handleClose }));
  });

  return currentPromise;
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
