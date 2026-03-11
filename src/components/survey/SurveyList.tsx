import type { Survey } from "../../types/survey"

interface Props {

  surveys: Survey[]
  onToggle: (id: string) => void

}

export const SurveyList = ({
  surveys,
  onToggle
}: Props) => {

  return (

    <div>

      {surveys.map(s => (

        <div key={s.id}>

          <h3>{s.title}</h3>

          <p>{s.description}</p>

          <button
            onClick={() => onToggle(s.id)}
          >
            {s.active
              ? "Desactivar"
              : "Activar"}

          </button>

        </div>

      ))}

    </div>

  )

}