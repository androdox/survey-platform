import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { SurveyResultsPage } from "../pages/SurveyResultsPage";
import { surveyService } from "../services/surveyService";
import { responseService } from "../services/responseService";

vi.mock("../services/surveyService", () => ({
  surveyService: {
    getAll: vi.fn(),
  },
}));

vi.mock("../services/responseService", () => ({
  responseService: {
    getBySurveyId: vi.fn(),
  },
}));


describe("SurveyResultsPage", () => {
  const mockedSurveyService = surveyService as unknown as { getAll: ReturnType<typeof vi.fn> };
  const mockedResponseService = responseService as unknown as { getBySurveyId: ReturnType<typeof vi.fn> };

  it("muestra los resultados y respuestas",
    async () => {
      const survey = {
        id: "abc",
        title: "Encuesta prueba",
        description: "desc",
        active: true,
        questions: [
          { id: "q1", text: "Pregunta 1", type: "TEXT" },
        ],
      };

      mockedSurveyService.getAll.mockResolvedValue([survey]);
      mockedResponseService.getBySurveyId.mockResolvedValue([
        {
          surveyId: "abc",
          answers: [{ questionId: "q1", value: "Respuesta 1" }],
        },
      ]);

      render(
        <MemoryRouter initialEntries={["/results/abc"]}>
          <Routes>
            <Route path="/results/:id" element={<SurveyResultsPage />} />
          </Routes>
        </MemoryRouter>
      );

      expect(await screen.findByText("Resultados: Encuesta prueba")).toBeTruthy();
      expect(await screen.findByText("Respuesta 1")).toBeTruthy();
  }, 5000);

  it("no falla con answers undefined y muestra sin respuesta",
    async () => {
      const survey = {
        id: "xyz",
        title: "Encuesta vacía",
        description: "desc",
        active: true,
        questions: [{ id: "q1", text: "Pregunta 1", type: "TEXT" }],
      };

      mockedSurveyService.getAll.mockResolvedValue([survey]);
      mockedResponseService.getBySurveyId.mockResolvedValue([
        {
          surveyId: "xyz",
          answers: undefined,
        },
      ]);

      render(
        <MemoryRouter initialEntries={["/results/xyz"]}>
          <Routes>
            <Route path="/results/:id" element={<SurveyResultsPage />} />
          </Routes>
        </MemoryRouter>
      );

      expect(await screen.findByText("Resultados: Encuesta vacía")).toBeTruthy();
      expect(await screen.findByText("Sin respuesta")).toBeTruthy();
  }, 5000);
});
