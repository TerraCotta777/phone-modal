import React from "react";
import { createRoot, Root } from "react-dom/client";
import { PhoneModal } from "./components/PhoneModal";

class PhoneModalManager {
  private root: Root | null = null;
  private currentPromise: Promise<string> | null = null;

  private getContainer(): HTMLElement {
    let el = document.getElementById("phone-modal-container");
    if (!el) {
      el = document.createElement("div");
      el.id = "phone-modal-container";
      document.body.appendChild(el);
    }
    return el;
  }

  async setPhone(): Promise<string> {
    if (this.currentPromise) {
      return this.currentPromise;
    }

    this.currentPromise = new Promise((resolve) => {
      const container = this.getContainer();

      const handleClose = () => {
        const savedPhone = localStorage.getItem("userPhone") || "";
        this.root?.unmount();
        this.root = null;
        this.currentPromise = null;
        resolve(savedPhone);
      };

      if (!this.root) {
        this.root = createRoot(container);
      }

      this.root.render(React.createElement(PhoneModal, { onClose: handleClose }));
    });

    return this.currentPromise;
  }
}

const manager = new PhoneModalManager();
export const setPhone = () => manager.setPhone();
