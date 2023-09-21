import { useContext, useState } from "react";
import ChipComponent from "../components/ChipComponent";
import DetailedChipComponent from "../components/DetailedChipComponent";
import { GameContext } from "../contexts/GameContext";
import { createReadChipLog } from "../model/ActionLog";
import Chip from "../model/Chip";
import { useNfcRead } from "../nfc/NfcUtils";
import View from "./View";

type Props = {
  setView: (view: View) => void;
};

export default function ReadChipView({ setView }: Props) {
  const [chip, setChip] = useState<Chip>();

  const gameState = useContext(GameContext);
  useNfcRead((event: NDEFReadingEvent) => {
    const chip = gameState.chips.get(event.serialNumber);
    if (chip == null) {
      alert("Unregistered chip. Try again.");
      return true;
    }

    setChip(chip);
    gameState.actionLogs.push(createReadChipLog(chip));

    return false;
  });

  return (
    <div className="w-full h-full py-6 flex flex-col justify-around items-center bg-green-700">
      <div className="text-5xl m-3">
        Scan your chip and be sure to hide the screen
      </div>
      <div className="flex-1 flex justify-center items-center">
        {chip == null ? (
          <ChipComponent size={200} />
        ) : (
          <DetailedChipComponent chip={chip} />
        )}
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
