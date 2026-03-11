import type { SurveyResponse } from "../types/survey";
import axios from "axios";

const API_URL = "http://localhost:3000"; // URL de tu backend

class ResponseService {

  // Guardar una respuesta de encuesta en el backend
  async add(response: { surveyId: string; answers: { questionId: string; value: string | number }[] }): Promise<SurveyResponse> {
    const res = await axios.post(`${API_URL}/responses`, response);
    return res.data; // Devuelve la respuesta creada
  }

  // Obtener todas las respuestas de una encuesta
  async getBySurveyId(surveyId: string): Promise<SurveyResponse[]> {
    // Ruta backend definida como /responses/:surveyId
    const res = await axios.get(`${API_URL}/responses/${surveyId}`);
    return res.data; // Devuelve un arreglo de SurveyResponse
  }

}

export const responseService = new ResponseService();