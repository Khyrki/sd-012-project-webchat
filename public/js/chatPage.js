window.onload = () => {
  const socket = window.io('http://localhost:3000');
    
  const button = document.getElementById('enviar');
  button.addEventListener('click', () => {
    console.log('clicou');
    socket.emit('message', { chatMessage: 'funciona', nickname: 'josimar' });
  });

  socket.on('message', (data) => console.log(data));  
};