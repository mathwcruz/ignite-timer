import { Cycle } from "./reducer"

export enum CyclesStateActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
  INTERRUPT_CURRENT_CYCLE = "INTERRUPT_CURRENT_CYCLE",
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