import axios from 'axios';

let baseUrl = '/';
if (process.env.VUE_APP_MODE === 'develop') {
  baseUrl = '/api/';
}

const config = {
  baseUrl,
};

function fetchPartyList() {
  return axios.get(`${config.baseUrl}party`);
}
function createParty(options) {
  return axios.post(`${config.baseUrl}party/create`, options);
}
export { fetchPartyList, createParty };
