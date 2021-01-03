import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_HOST;
console.log(process.env.REACT_APP_API_HOST);

const config = {
  baseUrl,
};

function fetchPartyList() {
  return axios.get(`${config.baseUrl}/party`);
}
function createParty(options) {
  return axios.post(`${config.baseUrl}/party/create`, options);
}
export { fetchPartyList, createParty };
