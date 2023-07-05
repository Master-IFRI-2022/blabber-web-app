const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New client connected');
  
    // Gérez les événements personnalisés ici
    socket.on('sendMessage', (message) => {
      // Traitement du message reçu
      // ...
  
      // Émettre l'événement 'newMessage' aux autres clients connectés
      socket.broadcast.emit('newMessage', message);
    });
  
    // Gérez d'autres événements ici
    // ...
  
    // Gérez la déconnexion du client
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  const port = 3030;
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
    