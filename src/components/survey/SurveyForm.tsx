import { useState, useEffect } from "react"
import { surveyService } from "../../services/surveyService"

import type {
    Survey,
    Question
} from "../../types/survey"

import { QuestionEditor } from "./QuestionEditor"

interface Props {
    reload: () => void
    surveyToEdit?: Survey
}

export const SurveyForm = ({
    reload,
    surveyToEdit
}: Props) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [questions, setQuestions] =
        useState<Question[]>([])

    useEffect(() => {

        if (surveyToEdit) {

            setTitle(surveyToEdit.title)
            setDescription(surveyToEdit.description)
            setQuestions(surveyToEdit.questions)

        }

    }, [surveyToEdit])

    const addQuestion = (q: Question) => {

        setQuestions(prev => [
            ...prev,
            q
        ])

    }

    const removeQuestion = (id: string) => {

        setQuestions(prev =>
            prev.filter(q => q.id !== id)
        )

    }

    const updateQuestionText = (
        id: string,
        text: string
    ) => {

        setQuestions(prev =>
            prev.map(q =>
                q.id === id
                    ? { ...q, text }
                    : q
            )
        )

    }

    const updateQuestionType = (
        id: string,
        type: string
    ) => {

        setQuestions(prev =>
            prev.map(q =>
                q.id === id
                    ? {
                        ...q,
                        type: type as any,
                        options:
                            type === "MULTIPLE"
                                ? q.options || []
                                : undefined
                    }
                    : q
            )
        )

    }

    const addOption = (id: string) => {

        setQuestions(prev =>
            prev.map(q =>
                q.id === id
                    ? {
                        ...q,
                        options: [
                            ...(q.options || []),
                            ""
                        ]
                    }
                    : q
            )
        )

    }

    const updateOption = (
        questionId: string,
        index: number,
        value: string
    ) => {

        setQuestions(prev =>
            prev.map(q => {

                if (q.id !== questionId)
                    return q

                const newOptions =
                    [...(q.options || [])]

                newOptions[index] = value

                return {
                    ...q,
                    options: newOptions
                }

            })
        )

    }

    const removeOption = (
        questionId: string,
        index: number
    ) => {

        setQuestions(prev =>
            prev.map(q => {

                if (q.id !== questionId)
                    return q

                return {
                    ...q,
                    options: q.options?.filter(
                        (_, i) => i !== index
                    )
                }

            })
        )

    }

    const moveQuestion = (
        index: number,
        direction: number
    ) => {

        const newQuestions = [...questions]

        const target = index + direction

        if (
            target < 0 ||
            target >= questions.length
        )
            return

        const temp = newQuestions[index]

        newQuestions[index] =
            newQuestions[target]

        newQuestions[target] = temp

        setQuestions(newQuestions)

    }

    const save = () => {

        const survey: Survey = {

            id:
                surveyToEdit?.id ||
                crypto.randomUUID(),

            title,
            description,

            active:
                surveyToEdit?.active ?? true,

            questions

        }

        if (surveyToEdit)
            surveyService.update(survey)
        else
            surveyService.create(survey)

        setTitle("")
        setDescription("")
        setQuestions([])

        reload()

    }

    return (

        <div className="card p-3 mb-3">

            <h4 className="mb-3">

                {surveyToEdit
                    ? "Editar encuesta"
                    : "Crear encuesta"}

            </h4>

            <input
                className="form-control mb-2"
                placeholder="Título"
                value={title}
                onChange={e =>
                    setTitle(e.target.value)
                }
            />

            <textarea
                className="form-control mb-3"
                placeholder="Descripción"
                value={description}
                onChange={e =>
                    setDescription(e.target.value)
                }
            />

            <QuestionEditor
                onAdd={addQuestion}
            />

            <hr />

            {questions.map((q, i) => (

                <div
                    key={q.id}
                    className="card p-3 mb-3"
                >

                    <h6>
                        Pregunta {i + 1}
                    </h6>

                    <input
                        className="form-control mb-2"
                        value={q.text}
                        onChange={e =>
                            updateQuestionText(
                                q.id,
                                e.target.value
                            )
                        }
                    />

                    <select
                        className="form-select mb-2"
                        value={q.type}
                        onChange={e =>
                            updateQuestionType(
                                q.id,
                                e.target.value
                            )
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

                    {q.type === "MULTIPLE" && (

                        <div>

                            {q.options?.map(
                                (o, index) => (

                                    <div
                                        key={index}
                                        className="d-flex mb-2"
                                    >

                                        <input
                                            className="form-control me-2"
                                            value={o}
                                            onChange={e =>
                                                updateOption(
                                                    q.id,
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                removeOption(
                                                    q.id,
                                                    index
                                                )
                                            }
                                        >
                                            X
                                        </button>

                                    </div>

                                ))}

                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() =>
                                    addOption(q.id)
                                }
                            >
                                Agregar opción
                            </button>

                        </div>

                    )}

                    <div className="mt-3">

                        <button
                            className="btn btn-danger me-2"
                            onClick={() =>
                                removeQuestion(q.id)
                            }
                        >
                            Eliminar
                        </button>

                        <button
                            className="btn btn-secondary me-2"
                            onClick={() =>
                                moveQuestion(i, -1)
                            }
                        >
                            ↑
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={() =>
                                moveQuestion(i, 1)
                            }
                        >
                            ↓
                        </button>

                    </div>

                </div>

            ))}

            <button
                className="btn btn-primary mt-3"
                onClick={save}
            >

                {surveyToEdit
                    ? "Actualizar encuesta"
                    : "Crear encuesta"}

            </button>

        </div>

    )

}