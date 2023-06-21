import { createContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { v4 as uuid } from "uuid";
import { HandPalm, Play } from "phosphor-react";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

import {
  StartCountdownButton,
  HomeContainer,
  StopCountdownButton,
} from "./styles";

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
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextData {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  cycleAmountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  markActiveCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextData);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [cycleAmountSecondsPassed, setCycleAmountSecondsPassed] =
    useState<number>(0);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

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

  const handleInterruptCycle = () => {
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

  const task: string = watch("task");
  const minutesAmount: number = watch("minutesAmount");
  const isSubmitDisabled = !task?.trim() || minutesAmount === 0;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleStartNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            cycleAmountSecondsPassed,
            markActiveCycleAsFinished,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
