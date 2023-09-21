import { useEffect, useState } from "react";

export default function useScreenOrientation() {
  const [orientation, setOrientation] = useState(
    window.screen.orientation.type
  );

  useEffect(() => {
    const previous = window.screen.orientation.onchange;
    window.screen.orientation.onchange = () =>
      setOrientation(window.screen.orientation.type);
    return () => {
      window.screen.orientation.onchange = previous;
    };
  }, []);

  return orientation;
}
