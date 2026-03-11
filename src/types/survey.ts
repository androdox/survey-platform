export type QuestionType =
  | "TEXT"
  | "MULTIPLE"
  | "RATING"

export interface Question {

  id: string
  text: string
  type: QuestionType
  options?: string[]

}

export interface Survey {

  id: string
  title: string
  description: string
  active: boolean
  questions: Question[]

}

export interface Answer {

  questionId: string
  value: string | number

}

export interface SurveyResponse {

  surveyId: string
  answers: Answer[]

}