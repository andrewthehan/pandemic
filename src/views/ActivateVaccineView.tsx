import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { useNfcRead } from "../nfc/NfcUtils";
import View from "./View";
import { copyChip, createActivateVaccineLog } from "../model/ActionLog";
import ChipComponent from "../components/ChipComponent";

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

    const before = copyChip(chip);

    if (chip.vaccines > 0) {
      chip.vaccines--;
      chip.isInfected = false;
    }

    gameState.actionLogs.push(createActivateVaccineLog(before, chip));

    setView(View.ACTION);
    return false;
  });

  return (
    <div className="w-full h-full py-6 flex flex-col justify-around items-center bg-rose-800">
      <div className="text-5xl m-3">
        Scan your chip to activate your vaccine
      </div>
      <div className="flex-1 flex justify-center items-center">
        <ChipComponent size={200} />
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
