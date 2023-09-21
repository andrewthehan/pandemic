import { useContext, useState } from "react";
import ChipComponent from "../components/ChipComponent";
import { GameContext } from "../contexts/GameContext";
import Chip from "../model/Chip";
import { useNfcRead } from "../nfc/NfcUtils";
import View from "./View";

type Props = {
  setView: (view: View) => void;
};

export default function ContactView({ setView }: Props) {
  const [a, setA] = useState<Chip>();
  const [b, setB] = useState<Chip>();

  const gameState = useContext(GameContext);
  useNfcRead(
    (event: NDEFReadingEvent) => {
      const chip = gameState.chips.get(event.serialNumber);
      if (chip == null) {
        alert("Unregistered chip. Try again.");
        return true;
      }

      if (a == null) {
        setA(chip);
        return true;
      }
      if (a === chip) {
        alert("Chip already selected. Scan a different chip.");
        return true;
      }
      if (b == null) {
        setB(chip);
        return false;
      }

      throw Error("Unexpectedly scanned an NFC chip.");
    },
    [a, b]
  );

  function contact(x: Chip, y: Chip) {
    if (!x.isInfected && !y.isInfected) {
      if (!x.gainedVaccinesFrom.has(y.id)) {
        x.gainedVaccinesFrom.add(y.id);
        x.vaccines++;
      }
      if (!y.gainedVaccinesFrom.has(x.id)) {
        y.gainedVaccinesFrom.add(x.id);
        y.vaccines++;
      }
      return;
    }

    if (x.isInfected && y.isInfected) {
      return;
    }

    if (x.isInfected) {
      if (y.vaccines > 0) {
        y.vaccines--;
        x.isInfected = false;
      } else {
        y.isInfected = true;
      }
    }

    if (y.isInfected) {
      if (x.vaccines > 0) {
        x.vaccines--;
        y.isInfected = false;
      } else {
        x.isInfected = true;
      }
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-around items-center bg-indigo-600">
      <div className="text-5xl m-3">Scan two chips to make contact</div>
      <div className="flex flex-row">
        <ChipComponent chip={a} />
        <ChipComponent chip={b} />
      </div>
      <div className="space-x-16">
        {a != null && b != null && (
          <button
            className="rounded border-2 px-6 py-2 text-2xl bg-white text-black"
            onClick={() => {
              contact(a, b);
              setView(View.ACTION);
            }}
          >
            Contact
          </button>
        )}
        <button
          className="rounded border-2 px-6 py-2 text-2xl"
          onClick={() => setView(View.ACTION)}
        >
          Back
        </button>
      </div>
    </div>
  );
}
