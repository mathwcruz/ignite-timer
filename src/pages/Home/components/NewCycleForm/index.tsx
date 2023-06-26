import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { CyclesContext } from "../../../../contexts/CyclesContext";

import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";

export function NewCycleForm() {
  const { activeCycle, cycles } = useContext(CyclesContext);

  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        type="text"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register("task")}
      />

      {cycles?.length > 0 && (
        <datalist id="task-suggestions">
          {cycles
            ?.filter(
              ({ finishedDate, interruptedDate }) =>
                !!finishedDate || !!interruptedDate
            )
            ?.map((cycle) => (
              <option key={cycle?.id} value={cycle?.task} />
            ))}
        </datalist>
      )}

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        step={5}
        min={5}
        max={60}
        placeholder="00"
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <label htmlFor="minutesAmount">minutos</label>
    </FormContainer>
  );
}
