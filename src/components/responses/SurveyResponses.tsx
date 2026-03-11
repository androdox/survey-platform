import type { SurveyResponse } from "../../types/survey"

export const SurveyResponses = ({
  responses
}: {
  responses: SurveyResponse[]
}) => {

  return (

    <div>

      <h2>Respuestas</h2>

      {responses.map((r, i) => (

        <div key={i}>

          {r.answers.map(a => (

            <p key={a.questionId}>
              {a.questionId}:
              {a.value}
            </p>

          ))}

        </div>

      ))}

    </div>

  )

}