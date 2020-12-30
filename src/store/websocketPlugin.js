export default function createWebSocketPlugin(socket) {
  return (store) => {
    socket.on('sessionId', (data) => {
      store.commit('SET_SOCKET_ID', data);
    });
    store.subscribe((mutation) => {
      if (mutation.type === 'SET_SOCKET_ID') {
        console.log('listen to SET_SOCKET_ID');
      }
    });
  };
}
