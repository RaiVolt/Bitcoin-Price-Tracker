import { DOMAttributes } from "react";
import { Transition } from "@headlessui/react";

export function FadeIn({
  children,
  ...props
}: DOMAttributes<HTMLDivElement> & { className?: string }) {
  return (
    <Transition
      appear
      show
      enter="transform-gpu ease-in-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      {...props}
    >
      {children}
    </Transition>
  );
}
