import { useEffect, useState } from "react";
import { responseService } from "../services/responseService";
import type { SurveyResponse } from "../types/survey";

export const useResponses = (surveyId: string) => {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);

  useEffect(() => {
    if (!surveyId) return;

    const loadResponses = async () => {
      try {
        const data = await responseService.getBySurveyId(surveyId);
        setResponses(data);
      } catch (error) {
        console.error("Error loading responses:", error);
        setResponses([]);
      }
    };

    loadResponses();
  }, [surveyId]);

  return { responses };
};