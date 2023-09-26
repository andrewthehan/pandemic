import { useContext } from "react";
import View from "./View";
import { GameContext } from "../contexts/GameContext";

type Props = {
  setView: (view: View) => void;
};

export default function HomeView({ setView }: Props) {
  const gameState = useContext(GameContext);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center background">
      <div className="text-6xl m-10">Pandemic</div>
      <div className="space-x-6 ">
        <button
          className="rounded border-2 px-6 py-2 text-2xl"
          onClick={() => {
            if (!("NDEFReader" in window)) {
              alert("Web NFC is not available. Use Chrome on Android.");
              return;
            }
            gameState.round = 1;
            gameState.chips.clear();
            gameState.actionLogs = [];
            setView(View.REGISTER);
          }}
        >
          Start
        </button>
        <button
          className="rounded border-2 px-6 py-2 text-2xl"
          onClick={() => setView(View.INFO)}
        >
          Info
        </button>
      </div>
      <a
        className="absolute bottom-2 text-sm"
        href="https://github.com/andrewthehan"
        target="_blank"
        rel="noopener noreferrer"
      >
        Made by Andrew Han
      </a>
    </div>
  );
}
