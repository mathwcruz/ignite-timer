import { useContext, useCallback } from "react";
import { Trash } from "phosphor-react";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { CyclesContext } from "../../contexts/CyclesContext";
import { Cycle } from "../../reducers/cycles-state/reducer";

import noDataIllustration from "../../assets/no-data-illustration.svg";
import {
  HistoryContainer,
  HistoryList,
  NoCyclesDataContainer,
  StatusBadge,
  RemoveCycleFromHistoryButton,
} from "./styles";

export function History() {
  const { cycles, removeCycleFromHistory } = useContext(CyclesContext);

  const isCycleInProgress = useCallback(
    ({ finishedDate, interruptedDate }: Cycle) => {
      return !finishedDate && !interruptedDate;
    },
    []
  );

  return (
    <HistoryContainer>
      {cycles?.length === 0 ? (
        <NoCyclesDataContainer>
          <img src={noDataIllustration} alt="" />
          <span>
            Você não possui nenhum histórico de ciclos até o presente momento.
          </span>
        </NoCyclesDataContainer>
      ) : (
        <>
          <h1>Meu histórico</h1>

          <HistoryList>
            <table>
              <thead>
                <tr>
                  <th>Tarefa</th>
                  <th>Duração</th>
                  <th>Início</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cycles?.map((cycle) => (
                  <tr key={cycle?.id}>
                    <td>{cycle?.task}</td>
                    <td>{cycle?.minutesAmount} minutos</td>
                    <td>
                      {formatDistanceToNow(new Date(cycle?.startDate), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </td>
                    <td>
                      {!!cycle?.finishedDate && (
                        <StatusBadge statuscolor="green">Concluído</StatusBadge>
                      )}
                      {!!cycle?.interruptedDate && (
                        <StatusBadge statuscolor="red">
                          Interrompido
                        </StatusBadge>
                      )}
                      {isCycleInProgress(cycle) && (
                        <StatusBadge statuscolor="yellow">
                          Em andamento
                        </StatusBadge>
                      )}
                    </td>
                    <td aria-label="Remover ciclo do histórico">
                      <RemoveCycleFromHistoryButton
                        type="button"
                        disabled={isCycleInProgress(cycle)}
                        title={isCycleInProgress(cycle) ? "" : "Remover ciclo"}
                        onClick={() => removeCycleFromHistory(cycle?.id)}
                      >
                        <Trash size={20} />
                      </RemoveCycleFromHistoryButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </HistoryList>
        </>
      )}
    </HistoryContainer>
  );
}
