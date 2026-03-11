import { useEffect, useState } from "react"
import { responseService } from "../services/responseService"
import type { SurveyResponse } from "../types/survey"

export const useResponses = (surveyId: string) => {

  const [responses, setResponses] =
    useState<SurveyResponse[]>([])

  useEffect(() => {

    const all =
      responseService.getAll()

    const filtered =
      all.filter(
        r => r.surveyId === surveyId
      )

    setResponses(filtered)

  }, [surveyId])

  return { responses }

}