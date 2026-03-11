import { useState } from "react"
import type { Question }
from "../../types/survey"

interface Props {
  onAdd: (q: Question) => void
}

export const QuestionEditor = ({
  onAdd
}: Props) => {

  const [text, setText] =
    useState("")

  const [type, setType] =
    useState("TEXT")

  const [options, setOptions] =
    useState("")

  const add = () => {

    const q: Question = {

      id: crypto.randomUUID(),

      text,

      type: type as any,

      options:
        type === "MULTIPLE"
          ? options
              .split(",")
              .map(o => o.trim())
              .filter(Boolean)
          : undefined

    }

    onAdd(q)

    setText("")
    setOptions("")

  }

  return (

    <div className="card p-3 mb-3">

      <input
        className="form-control mb-2"
        placeholder="Pregunta"
        value={text}
        onChange={e =>
          setText(e.target.value)
        }
      />

      <select
        className="form-select mb-2"
        value={type}
        onChange={e =>
          setType(e.target.value)
        }
      >

        <option value="TEXT">
          Texto
        </option>

        <option value="MULTIPLE">
          Opción múltiple
        </option>

        <option value="RATING">
          Calificación
        </option>

      </select>

      {type === "MULTIPLE" && (

        <input
          className="form-control mb-2"
          placeholder="opcion1,opcion2,opcion3"
          value={options}
          onChange={e =>
            setOptions(
              e.target.value
            )
          }
        />

      )}

      <button
        className="btn btn-success"
        onClick={add}
      >
        Agregar pregunta
      </button>

    </div>

  )

}