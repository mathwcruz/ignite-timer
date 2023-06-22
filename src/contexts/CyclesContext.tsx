import { ReactNode, createContext, useState } from "react";
import { v4 as uuid } from "uuid";

interface CreateNewCycleData {
  task: string;
  minutesAmount: number;
}

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
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

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [cycleAmountSecondsPassed, setCycleAmountSecondsPassed] =
    useState<number>(0);

  const activeCycle = cycles?.find((cycle) => cycle?.id === activeCycleId);

  const setSecondsPassed = (seconds: number) => {
    setCycleAmountSecondsPassed(seconds);
  };

  const markActiveCycleAsFinished = () => {
    setCycles((old) =>
      old?.map((cycle) => {
        if (cycle?.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
  };

  const createNewCycle = (data: CreateNewCycleData) => {
    const newCycle: Cycle = {
      id: uuid(),
      task: data?.task,
      minutesAmount: data?.minutesAmount,
      startDate: new Date(),
    };

    setCycles((old) => [...old, newCycle]);
    setActiveCycleId(newCycle?.id);
    setCycleAmountSecondsPassed(0);
  };

  const interruptCurrentCycle = () => {
    setCycles((old) =>
      old?.map((cycle) => {
        if (cycle?.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );

    setActiveCycleId(null);
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
        interruptCurrentCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
