import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { CyclesContext } from "../../contexts/CyclesContext";

import { HistoryContainer, HistoryList, StatusBadge } from "./styles";

export function History() {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Duração</th>
              <th>Status</th>
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
                    <StatusBadge statuscolor="red">Interrompido</StatusBadge>
                  )}
                  {!cycle?.finishedDate && !cycle?.interruptedDate && (
                    <StatusBadge statuscolor="yellow">Em andamento</StatusBadge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
