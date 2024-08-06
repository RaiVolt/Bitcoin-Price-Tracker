import { forwardRef, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FadeIn } from "../animations";
import clsx from "clsx";

type ModalProps = {
  close?: () => void;
  centered?: boolean;
  children: ReactNode;
  className?: string;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ close, centered, children, className }, ref) => {
    const [modalRef, setModalRef] = useState<HTMLDivElement | null>(null);

    // Dismiss focus from current element when modal opens
    useEffect(() => {
      const activeElement = document.activeElement as HTMLElement | null;

      if (!modalRef?.contains(activeElement)) {
        modalRef?.focus();
      }
      return () => {
        // On modal closing set focus back
        activeElement?.focus();
      };
    }, [modalRef]);

    return createPortal(
      <div
        ref={(node) => {
          setModalRef(node);
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        tabIndex={0}
        className={clsx([
          "fixed inset-0 overflow-y-auto",
          className,
          {
            "flex items-center justify-center": centered,
          },
        ])}
      >
        <FadeIn className="absolute inset-0" aria-hidden="true" onClick={close}>
          <div className="absolute inset-0 bg-black opacity-70" />
        </FadeIn>

        {children}
      </div>,
      document.getElementById("modals")!
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
