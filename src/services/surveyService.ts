import type { Survey } from "../types/survey"

const KEY = "surveys"

class SurveyService {

    getAll(): Survey[] {

        const data =
            localStorage.getItem(KEY)

        return data
            ? JSON.parse(data)
            : []

    }

    save(data: Survey[]) {

        localStorage.setItem(
            KEY,
            JSON.stringify(data)
        )

    }

    create(survey: Survey) {

        const surveys = this.getAll()

        surveys.push(survey)

        this.save(surveys)

    }

    delete(id: string) {

        const surveys =
            this.getAll().filter(
                s => s.id !== id
            )

        this.save(surveys)

    }

    toggle(id: string) {

        const surveys =
            this.getAll().map(s =>
                s.id === id
                    ? { ...s, active: !s.active }
                    : s
            )

        this.save(surveys)

    }

    update(updated: Survey) {

        const surveys = this.getAll()

        const newList = surveys.map(s =>
            s.id === updated.id
                ? updated
                : s
        )

        this.save(newList)

    }

}

export const surveyService =
    new SurveyService()