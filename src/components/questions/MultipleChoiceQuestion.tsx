import type { Question }
from "../../types/survey"

interface Props {

  question: Question

  onAnswer: (
    questionId: string,
    value: string | number
  ) => void

}

export const MultipleChoiceQuestion = ({
  question,
  onAnswer
}: Props) => {

  return (

    <div className="mb-3">

      <p>{question.text}</p>

      {question.options?.map(o => (

        <div
          key={o}
          className="form-check"
        >

          <input
            type="radio"
            name={question.id}
            className="form-check-input"
            onChange={() =>
              onAnswer(
                question.id,
                o
              )
            }
          />

          <label className="form-check-label">
            {o}
          </label>

        </div>

      ))}

    </div>

  )

}