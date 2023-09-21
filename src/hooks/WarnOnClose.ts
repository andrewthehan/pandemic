import { useEffect } from "react";

export function useWarnOnClose() {
  useEffect(() => {
    function warn(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = true;
      return true;
    }

    window.addEventListener("beforeunload", warn, { capture: true });
    return () =>
      window.removeEventListener("beforeunload", warn, { capture: true });
  });
}
