import axios, { AxiosResponse } from 'axios';
import { PartyListResponse, CreatePartyOption } from '../types';

const baseUrl = process.env.REACT_APP_API_HOST;

const config = {
  baseUrl,
};

function fetchPartyList(): Promise<AxiosResponse<PartyListResponse>> {
  return axios.get(`${config.baseUrl}/party`);
}
function createParty(
  options: CreatePartyOption
): Promise<AxiosResponse<PartyListResponse>> {
  return axios.post(`${config.baseUrl}/party/create`, options);
}

export { fetchPartyList, createParty };
