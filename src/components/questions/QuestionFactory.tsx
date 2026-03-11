import type { Question }
    from "../../types/survey"

import { TextQuestion }
    from "./TextQuestion"

import { MultipleChoiceQuestion }
    from "./MultipleChoiceQuestion"

import { RatingQuestion }
    from "./RatingQuestion"

interface Props {

    question: Question

    onAnswer: (
        questionId: string,
        value: string | number
    ) => void

}

export const QuestionFactory = ({
    question,
    onAnswer
}: Props) => {

    switch (question.type) {

        case "TEXT":

            return (
                <TextQuestion
                    question={question}
                    onAnswer={onAnswer}
                />
            )

        case "MULTIPLE":

            return (
                <MultipleChoiceQuestion
                    question={question}
                    onAnswer={onAnswer}
                />
            )

        case "RATING":

            return (
                <RatingQuestion
                    question={question}
                    onAnswer={onAnswer}
                />
            )

        default:
            return null

    }

}