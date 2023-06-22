import { ReactNode, createContext, useReducer, useState } from "react";
import { v4 as uuid } from "uuid";

import { Cycle, cyclesStateReducer } from "../reducers/cycles-state/reducer";
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles-state/actions";

interface CreateNewCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextData {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  cycleAmountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  markActiveCycleAsFinished: () => void;
  createNewCycle: (data: CreateNewCycleData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextData);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesStateReducer, {
    cycles: [],
    activeCycleId: null,
  });
  const [cycleAmountSecondsPassed, setCycleAmountSecondsPassed] =
    useState<number>(0);

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles?.find((cycle) => cycle?.id === activeCycleId);

  const setSecondsPassed = (seconds: number) => {
    setCycleAmountSecondsPassed(seconds);
  };

  const markActiveCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction());
  };

  const createNewCycle = (data: CreateNewCycleData) => {
    const newCycle: Cycle = {
      id: uuid(),
      task: data?.task,
      minutesAmount: data?.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));
    setCycleAmountSecondsPassed(0);
  };

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction());
  };

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        cycleAmountSecondsPassed,
        markActiveCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
