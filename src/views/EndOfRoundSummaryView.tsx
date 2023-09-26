import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import View from "./View";

type Props = {
  setView: (view: View) => void;
};

export default function EndOfRoundSummaryView({ setView }: Props) {
  const gameState = useContext(GameContext);

  return (
    <div className="w-full h-full py-6 flex flex-col justify-around items-center bg-green-700">
      <div className="text-5xl m-3">End of round {gameState.round}</div>
      <div className="text-4xl flex-1 flex flex-col justify-center space-y-10">
        <div>
          Infected:{" "}
          {
            Array.from(gameState.chips).filter(([id, chip]) => chip.isInfected)
              .length
          }
        </div>
        <div>
          Not infected:{" "}
          {
            Array.from(gameState.chips).filter(([id, chip]) => !chip.isInfected)
              .length
          }
        </div>
      </div>
      <button
        className="rounded border-2 px-6 py-2 text-2xl"
        onClick={() => {
          gameState.round++;
          setView(View.ACTION);
        }}
      >
        Next round
      </button>
    </div>
  );
}
