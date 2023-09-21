import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { useNfcRead } from "../nfc/NfcUtils";
import View from "./View";

type Props = {
  setView: (view: View) => void;
};

export default function ActivateVaccineView({ setView }: Props) {
  const gameState = useContext(GameContext);
  useNfcRead((event: NDEFReadingEvent) => {
    const chip = gameState.chips.get(event.serialNumber);
    if (chip == null) {
      alert("Unregistered chip. Try again.");
      return true;
    }

    if (chip.vaccines > 0) {
      chip.vaccines--;
      chip.isInfected = false;
    }

    setView(View.ACTION);
    return false;
  });

  return (
    <div className="w-full h-full flex flex-col justify-around items-center bg-rose-800">
      <div className="text-5xl m-3">
        Scan your chip to activate your vaccine
      </div>
      <button
        className="rounded border-2 px-6 py-2 text-2xl"
        onClick={() => setView(View.ACTION)}
      >
        Back
      </button>
    </div>
  );
}
