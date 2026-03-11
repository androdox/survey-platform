import type { Question }
from "../../types/survey"

interface Props {

  question: Question

  onAnswer: (
    questionId: string,
    value: string | number
  ) => void

}

export const TextQuestion = ({
  question,
  onAnswer
}: Props) => {

  return (

    <div className="mb-3">

      <label className="form-label">
        {question.text}
      </label>

      <input
        className="form-control"
        onChange={e =>
          onAnswer(
            question.id,
            e.target.value
          )
        }
      />

    </div>

  )

}