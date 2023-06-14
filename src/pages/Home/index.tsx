import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Play } from "phosphor-react";

import {
  CountdownContainer,
  StartCountdownButton,
  FormContainer,
  HomeContainer,
  Separator,
  TaskInput,
  MinutesAmountInput,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const handleStartNewCycle = (data: NewCycleFormData) => {
    console.log({ data });
    
    reset();
  };

  const task: string = watch("task");
  const minutesAmount: number = watch("minutesAmount");

  const isSubmitDisabled = !task?.trim() || minutesAmount === 0;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleStartNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register("task")}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            step={5}
            min={5}
            max={60}
            placeholder="00"
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <label htmlFor="minutesAmount">minutos</label>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
