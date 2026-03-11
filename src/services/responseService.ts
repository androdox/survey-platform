import type { SurveyResponse } from "../types/survey"

const STORAGE_KEY = "responses"

class ResponseService {

  getAll(): SurveyResponse[] {

    const data =
      localStorage.getItem(STORAGE_KEY)

    return data
      ? JSON.parse(data)
      : []

  }

  add(response: SurveyResponse) {

    const responses = this.getAll()

    responses.push(response)

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(responses)
    )

  }

  getBySurveyId(surveyId: string): SurveyResponse[] {

    return this
      .getAll()
      .filter(
        r => r.surveyId === surveyId
      )

  }

}

export const responseService =
  new ResponseService()