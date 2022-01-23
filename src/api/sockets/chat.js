const addZero = (n) => ((n < 10) ? `0${n}` : `${n}`);

const formatTime = (currentDate) => {
  const nowDate = {
    Day: addZero(currentDate.getDate()),
    Month: addZero(currentDate.getMonth() + 1),
    Year: currentDate.getFullYear(),
    Hour: addZero(currentDate.getHours()),
    Minute: addZero(currentDate.getMinutes()),
    Second: addZero(currentDate.getSeconds()),
  };
  const ampm = nowDate.Hour >= 12 ? 'PM' : 'AM';
  nowDate.Hour %= '12';
  nowDate.Hour = nowDate.Hour ? nowDate.Hour : '12';

  const formatedDate = `${nowDate.Day}-${nowDate.Month}-${nowDate.Year}`;
  const formatedHour = `${nowDate.Hour}:${nowDate.Minute}:${nowDate.Second} ${ampm}`;

  return `${formatedDate} ${formatedHour}`;
};

module.exports = (io) => io.on('connection', (socket) => {
  const { id } = socket;
  console.log(`Usuario conectou! ID: ${id}`);
  const initialNick = id.slice(0, -4);
  socket.emit('hello', 
    { msg: 'Olá, seja bem vindo ao nosso chat público!', initialNick });
  socket.on('message', ({ chatMessage, nickname }) => {
    console.log(`O ${nickname} enviou a mensagem: ${chatMessage}`);
    io.emit('message', `${formatTime(new Date())} - ${nickname}: ${chatMessage}`);
  });
});