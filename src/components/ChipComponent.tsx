import Chip from "../model/Chip";

type Props = {
  chip?: Chip;
  size?: number;
  bounce?: boolean;
};

export function getChipCharacter(chip?: Chip): string {
  return chip == null
    ? "None"
    : String.fromCharCode("A".charCodeAt(0) + Math.abs(hashCode(chip.id) % 26));
}

export function getChipColor(chip?: Chip): string {
  return chip == null ? "gray" : `hsl(${hashCode(chip.id)}, 50%, 50%)`;
}

export default function ChipComponent({
  chip,
  size = 100,
  bounce = false,
}: Props) {
  return (
    <div
      className={`border-2 rounded-full text-3xl flex justify-center items-center ${
        bounce ? "animate-bounce" : ""
      }`}
      style={{ background: getChipColor(chip), width: size, height: size }}
    >
      {getChipCharacter(chip)}
    </div>
  );
}

// copied and adapted from https://stackoverflow.com/a/7616484
function hashCode(s: string): number {
  var hash = 0,
    i,
    chr;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
