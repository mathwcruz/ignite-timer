import { useEffect, useContext } from "react";
import { differenceInSeconds } from "date-fns";

import { CyclesContext } from "../../../../contexts/CyclesContext";

import { CountdownContainer, Separator } from "./styles";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    cycleAmountSecondsPassed,
    markActiveCycleAsFinished,
    setSecondsPassed,
  } = useContext(CyclesContext);

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
      document.title = `Ignite Timer | ${currentCycleMinutesFormatted}:${currentCycleSecondsFormatted}`;
    }
  }, [activeCycle, currentCycleMinutesFormatted, currentCycleSecondsFormatted]);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference: number = differenceInSeconds(
          new Date(),
          activeCycle?.startDate
        );

        if (secondsDifference >= totalCycleSeconds) {
          markActiveCycleAsFinished();

          setSecondsPassed(totalCycleSeconds);

          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    activeCycleId,
    markActiveCycleAsFinished,
    setSecondsPassed,
    totalCycleSeconds,
  ]);

  return (
    <CountdownContainer>
      <span>{currentCycleMinutesFormatted[0]}</span>
      <span>{currentCycleMinutesFormatted[1]}</span>
      <Separator>:</Separator>
      <span>{currentCycleSecondsFormatted[0]}</span>
      <span>{currentCycleSecondsFormatted[1]}</span>
    </CountdownContainer>
  );
}
