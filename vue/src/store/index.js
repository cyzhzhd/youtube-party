import Vue from 'vue';
import Vuex from 'vuex';
import { io } from 'socket.io-client';

import state from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
import websocketPlugin from './websocketPlugin';

const url = 'https://www.utubeparty.com';
const socket = io(url, {
  reconnectionDelay: 10000,
  transports: ['websocket'],
}).connect();

const socketPlugin = websocketPlugin(socket);

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,

  plugins: [socketPlugin],
});
