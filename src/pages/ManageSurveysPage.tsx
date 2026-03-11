import { useSurveys } from "../hooks/useSurveys"
import { surveyService } from "../services/surveyService"
import { SurveyForm } from "../components/survey/SurveyForm"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Survey } from "../types/survey"

export const ManageSurveysPage = () => {

    const navigate = useNavigate()

    const {
        surveys,
        reload
    } = useSurveys()

    const [editing, setEditing] =
        useState<Survey | undefined>()

    return (

        <div className="container mt-4">

            <h2>
                Administrar encuestas
            </h2>

            <SurveyForm
                reload={() => {
                    reload()
                    setEditing(undefined)
                }}
                surveyToEdit={editing}
            />

            <hr />

            {surveys.map(s => (

                <div
                    key={s.id}
                    className="card p-3 mb-2"
                >

                    <h5>{s.title}</h5>

                    <button
                        className="btn btn-danger me-2"
                        onClick={() => {

                            surveyService.delete(s.id)
                            reload()

                        }}
                    >
                        Eliminar
                    </button>

                    <button
                        className="btn btn-primary me-2"
                        onClick={() => setEditing(s)}
                    >
                        Editar
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={() => {

                            surveyService.toggle(s.id)
                            reload()

                        }}
                    >
                        {s.active
                            ? "Desactivar"
                            : "Activar"}
                    </button>
                    
                    <button
                        className="btn btn-success me-2"
                        onClick={() =>
                            navigate(`/results/${s.id}`)
                        }
                    >
                        Ver respuestas
                    </button>

                </div>

            ))}

        </div>

    )

}