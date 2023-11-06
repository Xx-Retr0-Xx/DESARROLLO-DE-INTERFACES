const express = require('express');
const cors = require('cors');
const db = require('./services/db');
const login = require('./services/login');
const { testDatabaseConnection } = require('./services/db');
const app = express();
const port = 3030;

/**
 * AITOR SÁNCHEZ JIMÉNEZ
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Hola Mundo!' });
});


app.post('/login', async (req, res) => {
  try {
    const user = req.body.user;
    const password = req.body.password;

    if (!user || !password) {
      res.status(400).json({ error: 'Falta usuario o contraseña' });
      return;
    }

    const userData = await login.getUserData(user, password);

    if (userData.data) {
      res.status(200).json(userData);
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (err) {
    console.error('Error while getting data:', err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


app.listen(port, async () => {
  await testDatabaseConnection();
  console.log(`\nAPI escuchando en el puerto ${port}`);
});
