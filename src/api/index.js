import axios from 'axios';

const config = {
  baseUrl: 'http://3.35.79.27:3000',
};

function fetchPartyList() {
  return axios.get(`${config.baseUrl}/party`);
}
function createParty(options) {
  return axios.post(`${config.baseUrl}/party/create`, options);
}

export { fetchPartyList, createParty };
