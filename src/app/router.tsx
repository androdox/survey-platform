import { Routes, Route } from "react-router-dom"

import { ManageSurveysPage } from "../pages/ManageSurveysPage"
import { SurveysPage } from "../pages/SurveysPage"
import { FillSurveyPage } from "../pages/FillSurveyPage"
import { SurveyResultsPage } from "../pages/SurveyResultsPage"

export const Router = () => {

  return (

    <Routes>

      <Route
        path="/"
        element={<SurveysPage />}
      />

      <Route
        path="/admin"
        element={<ManageSurveysPage />}
      />

      <Route
        path="/survey/:id"
        element={<FillSurveyPage />}
      />

      <Route
        path="/results/:id"
        element={<SurveyResultsPage />}
      />

    </Routes>

  )

}