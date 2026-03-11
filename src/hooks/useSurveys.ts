import { useState, useEffect } from "react";
import { surveyService } from "../services/surveyService";
import type { Survey } from "../types/survey";

export const useSurveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await surveyService.getAll();
      setSurveys(data);
    } catch (error) {
      console.error("Error loading surveys:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return {
    surveys,
    loading,
    reload: load
  };
};