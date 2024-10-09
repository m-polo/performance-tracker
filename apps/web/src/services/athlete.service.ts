import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AthleteBasicsDetails } from "../shared/interfaces";

const baseUrl: string = import.meta.env.VITE_BASE_URL;

const authHeader = (token: string): AxiosRequestConfig => ({
  headers: { Authorization: `Bearer ${token}` },
});

export function getAllAthletes(searchText: string): Promise<AxiosResponse> {
  return axios.get(
    `${baseUrl}/athletes${searchText ? `?searchText=${searchText}` : ""}`
  );
}

export function getAthleteById(id: number): Promise<AxiosResponse> {
  return axios.get(`${baseUrl}/athletes/${id}`);
}

export function addNewAthlete(
  athlete: AthleteBasicsDetails,
  token: string
): Promise<AxiosResponse> {
  return axios.post(`${baseUrl}/athletes`, athlete, authHeader(token));
}

export function deleteAthlete(
  id: number,
  token: string
): Promise<AxiosResponse> {
  return axios.delete(`${baseUrl}/athletes/${id}`, authHeader(token));
}

export function editAthlete(
  athlete: AthleteBasicsDetails,
  token: string
): Promise<AxiosResponse> {
  return axios.put(
    `${baseUrl}/athletes/${athlete.id}`,
    athlete,
    authHeader(token)
  );
}
