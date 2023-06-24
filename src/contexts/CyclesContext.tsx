import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { differenceInSeconds } from "date-fns";
import { v4 as uuid } from "uuid";

import { Cycle, CyclesState, cyclesStateReducer } from "../reducers/cycles-state/reducer";
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
  const [cyclesState, dispatch] = useReducer(
    cyclesStateReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState: CyclesState) => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );

      if (storedStateAsJSON) return JSON.parse(storedStateAsJSON);

      return initialState;
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles?.find((cycle) => cycle?.id === activeCycleId);

  const [cycleAmountSecondsPassed, setCycleAmountSecondsPassed] =
    useState<number>(() => {
      if (activeCycle) {
        return differenceInSeconds(
          new Date(),
          new Date(activeCycle?.startDate)
        );
      }

      return 0;
    });

  useEffect(() => {
    const cyclesStateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", cyclesStateJSON);
  }, [cyclesState]);

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
