/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cycle } from "./reducer"

export type CyclesStateAction = {
  type: CyclesStateActionTypes;
  payload?: any;
}

export enum CyclesStateActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
  REMOVE_CYCLE_FROM_HISTORY = "REMOVE_CYCLE_FROM_HISTORY"
}

export const addNewCycleAction = (newCycle: Cycle) => {
  return {
    type: CyclesStateActionTypes.ADD_NEW_CYCLE,
    payload: { newCycle },
  }
}

export const markCurrentCycleAsFinishedAction = () => {
  return {
    type: CyclesStateActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED
  }
}

export const interruptCurrentCycleAction = () => {
  return {
    type: CyclesStateActionTypes.INTERRUPT_CURRENT_CYCLE
  }
}

export const removeCycleFromHistoryAction = (cycleId: string) => {
  return {
    type: CyclesStateActionTypes.REMOVE_CYCLE_FROM_HISTORY,
    payload: { cycleId }
  }
}