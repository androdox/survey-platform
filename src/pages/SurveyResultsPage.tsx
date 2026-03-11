import { useParams } from "react-router-dom"
import { surveyService } from "../services/surveyService"
import { responseService } from "../services/responseService"

import type { Survey } from "../types/survey"

export const SurveyResultsPage = () => {

  const { id } = useParams()

  const survey: Survey | undefined =
    surveyService
      .getAll()
      .find(s => s.id === id)

  if (!survey)
    return <div className="container mt-4">Encuesta no encontrada</div>

  const responses =
    responseService.getBySurveyId(survey.id)

  return (

    <div className="container mt-4">

      <h2 className="mb-4">
        Resultados: {survey.title}
      </h2>

      {survey.questions.map(q => (

        <div
          key={q.id}
          className="card p-3 mb-3"
        >

          <h5>{q.text}</h5>

          <ul className="list-group">

            {responses.map((res, index) => {

              const answer =
                res.answers.find(
                  a => a.questionId === q.id
                )

              return (

                <li
                  key={index}
                  className="list-group-item"
                >

                  {answer
                    ? answer.value
                    : "Sin respuesta"}

                </li>

              )

            })}

          </ul>

        </div>

      ))}

    </div>

  )

}