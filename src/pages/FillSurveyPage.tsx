import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { surveyService } from "../services/surveyService"
import { responseService } from "../services/responseService"

import { QuestionFactory } from "../components/questions/QuestionFactory"

import type {
  Answer,
  Survey
} from "../types/survey"

export const FillSurveyPage = () => {

  const { id } = useParams()

  const [survey, setSurvey] =
    useState<Survey | null>(null)
  const [loading, setLoading] =
    useState(true)
  const [answers, setAnswers] =
    useState<Answer[]>([])

  useEffect(() => {
    if (!id) {
      setSurvey(null)
      setLoading(false)
      return
    }

    const loadSurvey = async () => {
      setLoading(true)
      try {
        const data = await surveyService.getAll()
        const found = data.find(s => s.id === id) || null
        setSurvey(found)
      } catch (error) {
        console.error("Error cargando encuesta:", error)
        setSurvey(null)
      } finally {
        setLoading(false)
      }
    }

    loadSurvey()
  }, [id])

  if (loading)
    return <div>Cargando encuesta...</div>

  if (!survey)
    return <div>Encuesta no encontrada</div>

  const onAnswer = (
    questionId: string,
    value: string | number
  ) => {

    setAnswers(prev => {

      const filtered =
        prev.filter(
          a => a.questionId !== questionId
        )

      return [
        ...filtered,
        { questionId, value }
      ]

    })

  }

  const submit = () => {

    responseService.add({

      surveyId: survey.id,

      answers

    })

    alert("Encuesta enviada")

  }

  return (

    <div className="container mt-4">

      <h2 className="mb-3">
        {survey.title}
      </h2>

      <p>
        {survey.description}
      </p>

      <hr />

      {survey.questions.map(q => (

        <QuestionFactory
          key={q.id}
          question={q}
          onAnswer={onAnswer}
        />

      ))}

      <button
        className="btn btn-success mt-3"
        onClick={submit}
      >
        Enviar respuestas
      </button>

    </div>

  )

}