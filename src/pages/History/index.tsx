import { HistoryContainer, HistoryList, StatusBadge } from "./styles";

export function History() {
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
          <tr>
            <td>Tarefa 1</td>
            <td>20 minutos</td>
            <td>Há 2 meses</td>
            <td>
              <StatusBadge statusColor="green">
                Concluído
              </StatusBadge>
            </td>
          </tr>
          <tr>
            <td>Tarefa 2</td>
            <td>20 minutos</td>
            <td>Há 2 meses</td>
            <td>
              <StatusBadge statusColor="yellow">
                Em andamento
              </StatusBadge>
            </td>
          </tr>
          <tr>
            <td>Tarefa 3</td>
            <td>20 minutos</td>
            <td>Há 4 meses</td>
            <td>
              <StatusBadge statusColor="red">
                Interrompido
              </StatusBadge>
            </td>
          </tr>
        </tbody>
      </table>
    </HistoryList>
  </HistoryContainer>
  )
}