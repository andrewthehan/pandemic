import Chip from "../model/Chip";

type Props = {
  chip?: Chip;
};

export function getChipColor(chip?: Chip): string {
  return chip == null ? "gray" : `hsl(${hashCode(chip.id)}, 50%, 50%)`;
}

export default function ChipComponent({ chip }: Props) {
  const randomCharacter =
    chip == null
      ? "None"
      : String.fromCharCode(
          "A".charCodeAt(0) + Math.abs(hashCode(chip.id) % 26)
        );
  return (
    <div
      className="m-4 border-2 rounded-full text-3xl w-24 h-24 flex justify-center items-center"
      style={{ background: getChipColor(chip) }}
    >
      {randomCharacter}
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
