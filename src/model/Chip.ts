type Chip = {
  id: string;
  isInfected: boolean;
  vaccines: number;
  gainedVaccinesFrom: Set<string>;
};

export function createChip(id: string): Chip {
  return {
    id,
    isInfected: false,
    vaccines: 0,
    gainedVaccinesFrom: new Set(),
  };
}

export default Chip;
