import { useState, useEffect } from "react"
import { surveyService } from "../services/surveyService"
import type { Survey } from "../types/survey"

export const useSurveys = () => {

  const [surveys, setSurveys] =
    useState<Survey[]>([])

  const load = () => {

    setSurveys(
      surveyService.getAll()
    )

  }

  useEffect(() => {

    load()

  }, [])

  return {

    surveys,
    reload: load

  }

}