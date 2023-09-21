import { createContext, createElement } from "react";
import Chip from "../model/Chip";
import ActionLog from "../model/ActionLog";

export type GameState = {
  chips: Map<string, Chip>;
  actionLogs: ActionLog[];
};

const gameState: GameState = {
  chips: new Map<string, Chip>(),
  actionLogs: [],
};

export const GameContext = createContext<GameState>(gameState);

export function GameContextProvider({ children }: any) {
  return createElement(GameContext.Provider, {
    value: gameState,
    children,
  });
}
