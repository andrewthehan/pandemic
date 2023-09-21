import { createContext, createElement } from "react";
import Chip from "../model/Chip";

export type GameState = {
  chips: Map<string, Chip>;
};

const gameState = {
  chips: new Map<string, Chip>(),
};

export const GameContext = createContext<GameState>(gameState);

export function GameContextProvider({ children }: any) {
  return createElement(GameContext.Provider, {
    value: gameState,
    children,
  });
}
