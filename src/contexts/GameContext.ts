import { createContext, createElement } from "react";
import Chip from "../model/Chip";
import ActionLog from "../model/ActionLog";

export type GameState = {
  round: number;
  chips: Map<string, Chip>;
  actionLogs: ActionLog[];
};

const initialGameState: GameState = {
  round: 1,
  chips: new Map<string, Chip>(),
  actionLogs: [],
};

export const GameContext = createContext<GameState>(initialGameState);

export function GameContextProvider({ children }: any) {
  return createElement(GameContext.Provider, {
    value: initialGameState,
    children,
  });
}
