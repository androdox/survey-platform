import type { Survey } from "../types/survey";
import axios from "axios";

const API_URL = "http://localhost:3000"; // URL de tu backend

class SurveyService {

  async getAll(): Promise<Survey[]> {
    const res = await axios.get(`${API_URL}/surveys`);
    return res.data; // ya viene del backend
  }

  async create(survey: Survey): Promise<Survey> {
    const res = await axios.post(`${API_URL}/surveys`, survey);
    return res.data;
  }

  async update(updated: Survey): Promise<Survey> {
    const res = await axios.put(`${API_URL}/surveys/${updated.id}`, updated);
    return res.data;
  }

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/surveys/${id}`);
  }

  async toggle(id: string): Promise<Survey> {
    const res = await axios.patch(`${API_URL}/surveys/${id}/toggle`);
    return res.data;
  }

}

export const surveyService = new SurveyService();