import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_HOST;

const config = {
  baseUrl,
};

function fetchPartyList() {
  return axios.get(`${config.baseUrl}/party`);
}
function createParty(options: any) {
  return axios.post(`${config.baseUrl}/party/create`, options);
}

function addVideoList(options: any) {
  return axios.post(`${config.baseUrl}/party/addVideo`, options);
}

export { fetchPartyList, createParty, addVideoList };
