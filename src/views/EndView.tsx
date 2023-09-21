import { useContext, useState } from "react";
import DetailedChipComponent from "../components/DetailedChipComponent";
import { GameContext } from "../contexts/GameContext";
import ActionLog, {
  ActionType,
  ActivateVaccineData,
  ContactData,
  ReadChipData,
} from "../model/ActionLog";
import View from "./View";
import { useNfcRead } from "../nfc/NfcUtils";

type Props = {
  setView: (view: View) => void;
};

export default function EndView({ setView }: Props) {
  const gameState = useContext(GameContext);

  const [lastScanned, setLastScanned] = useState("");

  useNfcRead((event: NDEFReadingEvent) => {
    const { serialNumber } = event;
    setLastScanned(serialNumber);
    return true;
  });

  function renderActionLog(actionLog: ActionLog) {
    switch (actionLog.actionType) {
      case ActionType.READ_CHIP:
        const readChipData = actionLog.data as ReadChipData;
        return (
          <div className="p-2 bg-green-700">
            <div className="text- text-center">Read chip</div>
            <div className="m-2 flex justify-center">
              <DetailedChipComponent
                chip={readChipData}
                bounce={readChipData.id === lastScanned}
              />
            </div>
          </div>
        );
      case ActionType.CONTACT:
        const contactData = actionLog.data as ContactData;
        return (
          <div className="p-2 bg-indigo-600">
            <div className="text-lg text-center">Contact</div>
            <div>
              <div>Before</div>
              <div className="my-2 flex flex-row justify-around">
                <DetailedChipComponent
                  chip={contactData.a.before}
                  bounce={contactData.a.before.id === lastScanned}
                />
                <DetailedChipComponent
                  chip={contactData.b.before}
                  bounce={contactData.b.before.id === lastScanned}
                />
              </div>
            </div>
            <div>
              <div>After</div>
              <div className="my-2 flex flex-row justify-around">
                <DetailedChipComponent
                  chip={contactData.a.after}
                  bounce={contactData.a.after.id === lastScanned}
                />
                <DetailedChipComponent
                  chip={contactData.b.after}
                  bounce={contactData.b.after.id === lastScanned}
                />
              </div>
            </div>
          </div>
        );
      case ActionType.ACTIVATE_VACCINE:
        const activateVaccineData = actionLog.data as ActivateVaccineData;
        return (
          <div className="p-2 bg-rose-800">
            <div className="text-lg text-center">Activate vaccine</div>
            <div className="flex flex-row justify-around">
              <div>
                <div>Before</div>
                <div className="my-2">
                  <DetailedChipComponent
                    chip={activateVaccineData.before}
                    bounce={activateVaccineData.before.id === lastScanned}
                  />
                </div>
              </div>
              <div>
                <div>After</div>
                <div className="my-2">
                  <DetailedChipComponent
                    chip={activateVaccineData.after}
                    bounce={activateVaccineData.after.id === lastScanned}
                  />
                </div>
              </div>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="w-full h-full py-6 px-4 flex flex-col justify-between items-stretch">
      <div className="text-4xl text-center">End</div>
      <div className="flex-1">
        <div className="text-3xl my-2">Players</div>
        <div className="flex flex-row flex-wrap justify-around my-4">
          {Array.from(gameState.chips).map(([id, chip]) => (
            <div key={id} className="m-2">
              <DetailedChipComponent chip={chip} bounce={id === lastScanned} />
            </div>
          ))}
        </div>
        <div className="text-3xl my-2">Action logs</div>
        {gameState.actionLogs.map((log, i) => (
          <div key={i} className="w-full rounded border-2 my-4">
            {renderActionLog(log)}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="rounded border-2 mb-6 px-6 py-2 text-2xl"
          onClick={() => {
            gameState.chips.clear();
            gameState.actionLogs = [];
            setView(View.HOME);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
