import type { SurveyResponse }
from "../../types/survey"

interface Props {
  responses: SurveyResponse[]
}

export const ResultsTable = ({
  responses
}: Props) => {

  return (

    <table className="table">

      <thead>

        <tr>
          <th>#</th>
          <th>Respuestas</th>
        </tr>

      </thead>

      <tbody>

        {responses.map((r, i) => (

          <tr key={i}>

            <td>{i + 1}</td>

            <td>

              {r.answers.map(a => (
                <div key={a.questionId}>
                  {a.value}
                </div>
              ))}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  )

}