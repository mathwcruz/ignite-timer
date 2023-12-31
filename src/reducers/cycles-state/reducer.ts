import { produce } from "immer";

import { CyclesStateAction, CyclesStateActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export const cyclesStateReducer = (
  state: CyclesState,
  action: CyclesStateAction
) => {
  switch (action.type) {
    case CyclesStateActionTypes.ADD_NEW_CYCLE: {
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle);
        draft.activeCycleId = action.payload.newCycle.id;
      });
    }

    case CyclesStateActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state?.cycles?.findIndex(
        (cycle) => cycle?.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].finishedDate = new Date();
      });
    }

    case CyclesStateActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state?.cycles?.findIndex(
        (cycle) => cycle?.id === state.activeCycleId
      );

      if (currentCycleIndex < 0) {
        return state;
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null;
        draft.cycles[currentCycleIndex].interruptedDate = new Date();
      });
    }

    case CyclesStateActionTypes.REMOVE_CYCLE_FROM_HISTORY: {
      return produce(state, (draft) => {
        draft.cycles = draft.cycles?.filter(
          (cycle) => cycle?.id !== action.payload.cycleId
        );
      });
    }

    default:
      return state;
  }
};
