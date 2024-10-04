import { ToastOptions } from "@ionic/react";
import { HookOverlayOptions } from "@ionic/react/dist/types/hooks/HookOverlayOptions";

export const successToast = (message: string) =>
  ({
    message,
    position: "top",
    color: "success",
  }) as ToastOptions & HookOverlayOptions;

export const errorToast = (message: string) =>
  ({
    message,
    position: "top",
    color: "danger",
  }) as ToastOptions & HookOverlayOptions;
