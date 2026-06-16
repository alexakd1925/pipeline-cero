const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="background-color: #282c34; color: white; text-align: center; font-family: sans-serif; padding-top: 50px;">
        <h1>🚀 ¡Despliegue Exitoso!</h1>
        <p>El pipeline desde ICEITECH hasta AWS funciona perfectamente.</p>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`App corriendo en el puerto ${port}`);
});  