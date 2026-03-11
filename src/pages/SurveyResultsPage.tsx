import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { surveyService } from "../services/surveyService";
import { responseService } from "../services/responseService";

import type { Survey, SurveyResponse } from "../types/survey";

export const SurveyResultsPage = () => {
  const { id } = useParams<{ id: string }>();

  const [survey, setSurvey] = useState<Survey | undefined>();
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const allSurveys = await surveyService.getAll(); // Devuelve Promise<Survey[]>
        console.log("All surveys:", allSurveys); // Verificar el contenido de allSurveys
        const currentSurvey = allSurveys.find(s => s.id === id);
        setSurvey(currentSurvey);

        if (currentSurvey) {
          const surveyResponses = await responseService.getBySurveyId(currentSurvey.id);
          setResponses(
            (surveyResponses || []).map((r) => ({
              ...r,
              answers: r.answers || [],
            }))
          );
        }
      } catch (error) {
        console.error("Error loading survey data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) return <div className="container mt-4">Cargando...</div>;
  if (!survey) return <div className="container mt-4">Encuesta no encontrada</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Resultados: {survey.title}</h2>

      {survey.questions.map(q => (
        <div key={q.id} className="card p-3 mb-3">
          <h5>{q.text}</h5>

          <ul className="list-group">
            {responses.map((res, index) => {
              const answer = res.answers?.find(a => a.questionId === q.id);
              return (
                <li key={index} className="list-group-item">
                  {answer ? answer.value : "Sin respuesta"}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};