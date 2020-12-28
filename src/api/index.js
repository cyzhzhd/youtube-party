import axios from 'axios';

// const config = {
//   // baseUrl: 'https://www.utubeparty.com', 
//   baseUrl: '/', 
// };

function fetchPartyList() {
  return axios.get(`/party`);
}
function createParty(options) {
  return axios.post(`/party/create`, options);
}
// function fetchPartyList() {
//   return axios.get(`${config.baseUrl}/party`);
// }
// function createParty(options) {
//   return axios.post(`${config.baseUrl}/party/create`, options);
// }

export { fetchPartyList, createParty };
