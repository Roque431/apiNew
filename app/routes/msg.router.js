
module.exports = app => {
    const twilio = require('twilio');
    // const express = require('express');
const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// // Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de Twilio
const accountSid = 'AC9bf6bc910875e6e481cccd9319198193';
const authToken = 'b5d6232c16c012e4bf732fc242d6fc82';
const client = twilio(accountSid, authToken);

// Ruta para enviar mensajes de texto con Twilio
app.post('/enviar-sms', async (req, res) => {
    try {
      const { to, body } = req.body;
  
      const message = await client.messages.create({
        body: body,
        from: '+12407861602', // Reemplázalo con tu número Twilio
        to: to,
      });
  
      res.json({ messageSid: message.sid, status: 'Mensaje enviado exitosamente' });
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      res.status(500).json({ error: 'Error interno del servidor', message: error.message });
    }
  });
  

// app.listen(port, () => {
//   console.log(`Servidor escuchando en http://localhost:${port}`);
// });


};