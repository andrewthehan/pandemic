import Chip from "../model/Chip";
import ChipComponent from "./ChipComponent";

type Props = {
  chip: Chip;
  bounce?: boolean;
};

export default function DetailedChipComponent({ chip, bounce = false }: Props) {
  return (
    <div
      className={`py-4 border-2 w-32 rounded flex flex-col justify-center items-center ${
        chip.isInfected ? "bg-rose-800" : "bg-green-700"
      } ${bounce ? "animate-bounce" : ""}`}
    >
      <ChipComponent chip={chip} size={50} />
      <div className="text-center pt-2">
        <div>{chip.isInfected ? "Infected" : "Not infected"}</div>
        <div>
          {chip.vaccines} vaccine{chip.vaccines === 1 ? "" : "s"}
        </div>
      </div>
    </div>
  );
}
