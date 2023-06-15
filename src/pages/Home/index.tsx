import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { v4 as uuid } from "uuid";
import { differenceInSeconds } from "date-fns";
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
import { useEffect, useState } from "react";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [cycleAmountSecondsPassed, setCycleAmountSecondsPassed] =
    useState<number>(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const activeCycle = cycles?.find((cycle) => cycle?.id === activeCycleId);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        setCycleAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle?.startDate)
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    }
  }, [activeCycle]);

  const handleStartNewCycle = (data: NewCycleFormData) => {
    const newCycle: Cycle = {
      id: uuid(),
      task: data?.task,
      minutesAmount: data?.minutesAmount,
      startDate: new Date(),
    };

    setCycles((old) => [...old, newCycle]);
    setActiveCycleId(newCycle?.id);
    setCycleAmountSecondsPassed(0);

    reset();
  };

  const totalCycleSeconds: number = activeCycle
    ? activeCycle?.minutesAmount * 60
    : 0;
  const currentCycleSeconds: number = activeCycle
    ? totalCycleSeconds - cycleAmountSecondsPassed
    : 0;
  const currentCycleMinutesAmount: number = Math.floor(
    currentCycleSeconds / 60
  );
  const currenCycleSecondsAmount: number = currentCycleSeconds % 60;
  const currentCycleMinutesFormatted: string = String(
    currentCycleMinutesAmount
  ).padStart(2, "0");
  const currentCycleSecondsFormatted: string = String(
    currenCycleSecondsAmount
  ).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Timer | ${currentCycleMinutesFormatted}:${currentCycleSecondsFormatted}`
    }
  }, [activeCycle, currentCycleMinutesFormatted, currentCycleSecondsFormatted]);

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
          <span>{currentCycleMinutesFormatted[0]}</span>
          <span>{currentCycleMinutesFormatted[1]}</span>
          <Separator>:</Separator>
          <span>{currentCycleSecondsFormatted[0]}</span>
          <span>{currentCycleSecondsFormatted[1]}</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
