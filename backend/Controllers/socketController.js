const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');

const chat= () =>{
    const server = http.createServer(app);
    const io = socketIo(server, { cors: { origin: '*' } });

    io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('candidateMessage', async (data) => {
        const { resume, jobDesc, candidateInput } = data;

        // Get bot response
        const botResponse = await getBotResponse(resume, jobDesc, candidateInput);

        // Send bot response back
        socket.emit('botReply', { text: botResponse });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
    });

    server.listen(5000, () => console.log('Server running on port 5000'));

}

export default chat;