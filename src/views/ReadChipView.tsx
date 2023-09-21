import { Fragment, useContext, useState } from "react";
import ChipComponent from "../components/ChipComponent";
import { GameContext } from "../contexts/GameContext";
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
    return false;
  });

  return (
    <div
      className={`w-full h-full flex flex-col justify-around items-center ${
        chip?.isInfected ? "bg-rose-800" : "bg-green-700"
      }`}
    >
      {chip == null ? (
        <div className="text-5xl m-3">
          Scan your chip and be sure to hide the screen
        </div>
      ) : (
        <Fragment>
          <div className="flex flex-col justify-around items-center">
            <ChipComponent chip={chip} />
            <div className="rounded-full py-2 px-4 m-6 text-2xl bg-white text-black">
              {chip.vaccines} vaccine{chip.vaccines === 1 ? "" : "s"}
            </div>
          </div>
          <div className="text-5xl">
            {chip.isInfected ? "Infected" : "Not infected"}
          </div>
        </Fragment>
      )}
      <button
        className="rounded border-2 px-6 py-2 text-2xl"
        onClick={() => setView(View.ACTION)}
      >
        Back
      </button>
    </div>
  );
}
