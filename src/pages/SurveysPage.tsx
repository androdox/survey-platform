import { Link } from "react-router-dom"
import { useSurveys } from "../hooks/useSurveys"

export const SurveysPage = () => {

  const { surveys } =
    useSurveys()

  const active =
    surveys.filter(
      s => s.active
    )

  return (

    <div className="container mt-4">

      <h2>
        Encuestas disponibles
      </h2>

      {active.map(s => (

        <div
          key={s.id}
          className="card p-3 mb-2"
        >

          <h5>{s.title}</h5>

          <Link
            className="btn btn-primary"
            to={`/survey/${s.id}`}
          >
            Responder
          </Link>

        </div>

      ))}

    </div>

  )

}