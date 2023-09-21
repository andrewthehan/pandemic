import Chip from "./Chip";

export enum ActionType {
  READ_CHIP,
  CONTACT,
  ACTIVATE_VACCINE,
}

export function copyChip(chip: Chip): Chip {
  return Object.assign({}, chip);
}

export type BeforeAfterChipData = {
  before: Chip;
  after: Chip;
};

function createBeforeAfter(before: Chip, after: Chip) {
  return {
    before: copyChip(before),
    after: copyChip(after),
  };
}

export type ReadChipData = Chip;

export function createReadChipLog(chip: Chip): ActionLog {
  return {
    actionType: ActionType.READ_CHIP,
    data: copyChip(chip),
  };
}

export type ContactData = {
  a: BeforeAfterChipData;
  b: BeforeAfterChipData;
};

export function createContactLog(
  aBefore: Chip,
  aAfter: Chip,
  bBefore: Chip,
  bAfter: Chip
): ActionLog {
  return {
    actionType: ActionType.CONTACT,
    data: {
      a: createBeforeAfter(aBefore, aAfter),
      b: createBeforeAfter(bBefore, bAfter),
    },
  };
}

export type ActivateVaccineData = BeforeAfterChipData;

export function createActivateVaccineLog(before: Chip, after: Chip): ActionLog {
  return {
    actionType: ActionType.ACTIVATE_VACCINE,
    data: createBeforeAfter(before, after),
  };
}

type ActionLog = {
  actionType: ActionType;
  data: ReadChipData | ContactData | ActivateVaccineData;
};

export default ActionLog;
