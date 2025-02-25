import { useEffect } from "react";
import { toast } from "sonner";
import { useRegisterSW } from "virtual:pwa-register/react";

export function PWAPrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(
      swUrl: string,
      registration: ServiceWorkerRegistration | undefined
    ) {
      console.log(`SW Registered: ${registration?.scope || swUrl}`);
    },
    onRegisterError(error: Error) {
      console.error("SW registration error", error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      toast.message("Update Available", {
        description: "A new version is available",
        action: {
          label: "Update",
          onClick: () => updateServiceWorker(true),
        },
      });
    }
  }, [needRefresh, updateServiceWorker]);

  return null;
}
