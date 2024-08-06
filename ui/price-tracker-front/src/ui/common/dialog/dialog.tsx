import clsx from "clsx";
import React, { useState, ReactNode, cloneElement, useEffect } from "react";
import { Modal } from "../modal";
// import { Button, ButtonProps } from "../button";
// import { getIsPromise } from '../../utils'
// import { typo } from "../styles";
// import Close from '../icon/close'

type Params = {
  title: string;
  subTitle?: string;
  image?: string;
  description?: string | null;
  body?: ReactNode;
  // buttons: Array<ButtonProps & { isControlled?: boolean }>;
  hasCloseIcon?: boolean;
  noDivider?: boolean;
  className?: string;
  onClose?: () => void;
  modalClassName?: string;
  isBusy?: boolean;
};
export type BodyProps = {
  closePopup?: () => void;
};

export function useDialog({
  title,
  description,
  image,
  subTitle,
  body,
  // buttons,
  noDivider,
  onClose,
  hasCloseIcon = false,
  className = "",
  modalClassName = "",
  isBusy: initialIsBusy = false,
}: Params) {
  const { isPopupOpen, openPopup, closePopup } = usePopupState();

  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    setIsBusy(initialIsBusy);
  }, [initialIsBusy, setIsBusy]);

  const handleClosePopup = () => {
    onClose?.();
    closePopup();
  };

  let popup = null;

  if (isPopupOpen) {
    popup = (
      <Modal centered close={handleClosePopup} className={modalClassName}>
        <div
          className={clsx(
            "min-w-[300px] m-20 bg-white absolute flex flex-col rounded-lg",
            className
          )}
        >
          <div
            className={clsx({
              "h-[68px] inline-flex justify-between": true,
              "items-center": !subTitle,
              "items-start": subTitle,
              "border-b-1 border-platinum px-5": !noDivider,
            })}
          >
            <div>
              <div>
                <h3>{title}</h3>
                {subTitle && <h6 className={clsx("mt-3")}>{subTitle}</h6>}
              </div>
            </div>

            {hasCloseIcon && (
              <div
                className={clsx(
                  "flex items-center justify-center cursor-pointer"
                )}
                onClick={handleClosePopup}
              >
                ⨉
              </div>
            )}
          </div>

          <div className={clsx("p-5")}>
            {description ||
              cloneElement(body as React.ReactElement<BodyProps>, {
                closePopup: handleClosePopup,
              })}
          </div>
        </div>
      </Modal>
    );
  }

  return { popup, isPopupOpen, openPopup, closePopup };
}

function usePopupState() {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  return {
    isPopupOpen,
    openPopup: () => setIsPopupOpen(true),
    closePopup: () => setIsPopupOpen(false),
  };
}
