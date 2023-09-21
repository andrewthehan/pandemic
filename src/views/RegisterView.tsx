import { useContext, useState } from "react";
import ChipComponent, { getChipColor } from "../components/ChipComponent";
import { GameContext } from "../contexts/GameContext";
import { useForceUpdate } from "../hooks/ForceUpdate";
import { createChip } from "../model/Chip";
import { useNfcRead } from "../nfc/NfcUtils";
import { repeat, shuffle } from "../utils/ArrayUtils";
import View from "./View";

type Props = {
  setView: (view: View) => void;
};

export default function RegisterView({ setView }: Props) {
  const forceUpdate = useForceUpdate();
  const gameState = useContext(GameContext);

  const [lastScanned, setLastScanned] = useState("");

  useNfcRead((event: NDEFReadingEvent) => {
    const { serialNumber } = event;

    gameState.chips.set(serialNumber, createChip(serialNumber));
    setLastScanned(serialNumber);
    forceUpdate();

    return true;
  });

  const infectedCount = Math.ceil(gameState.chips.size / 4);

  function contaminate() {
    const shuffled = shuffle(Array.from(gameState.chips));

    repeat(infectedCount, (i) => {
      // eslint-disable-next-line
      const [id, chip] = shuffled[i];
      chip.isInfected = true;
    });
  }

  return (
    <div
      className="w-full h-full py-6 flex flex-col justify-around items-center"
      style={{ background: getChipColor(gameState.chips.get(lastScanned)) }}
    >
      <div className="flex flex-col justify-around items-center">
        <div className="text-6xl m-6">Scan players</div>
        <div className="text-xl">
          {infectedCount} infected player{infectedCount === 1 ? "" : "s"}
        </div>
      </div>
      <div className="flex-1 flex flex-row flex-wrap justify-center items-center">
        {Array.from(gameState.chips).map(([id, chip]) => (
          <div key={id} className="m-2">
            <ChipComponent chip={chip} size={80} bounce={id === lastScanned} />
          </div>
        ))}
      </div>
      <button
        disabled={gameState.chips.size < 4}
        className="rounded border-2 px-6 py-2 text-2xl"
        onClick={() => {
          contaminate();
          setView(View.ACTION);
        }}
      >
        {gameState.chips.size < 4 ? "Requires at least 4 players" : "Start"}
      </button>
    </div>
  );
}
