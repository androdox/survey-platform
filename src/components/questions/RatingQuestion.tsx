import type { Question }
from "../../types/survey"

interface Props {

  question: Question

  onAnswer: (
    questionId: string,
    value: string | number
  ) => void

}

export const RatingQuestion = ({
  question,
  onAnswer
}: Props) => {

  return (

    <div className="mb-3">

      <p>{question.text}</p>

      <select
        className="form-select"
        onChange={e =>
          onAnswer(
            question.id,
            Number(e.target.value)
          )
        }
      >

        <option value="">
          Seleccione
        </option>

        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>

      </select>

    </div>

  )

}