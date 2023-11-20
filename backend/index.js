const express = require('express');
const cors = require('cors');
const db = require('./services/db');
const login = require('./services/login');
const { testDatabaseConnection } = require('./services/db');
const { insertData } = require('./services/items');
const { getData } = require('./services/items');
const { deleteDataByID } = require('./services/items');
const items = require('./services/items');

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


{/*FUNCIONES PARA EL LOGIN */}

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


{/*FUNCIONES PARA EL CRUD */}

//Insertar datos
app.post('/addItem', async function(req, res, next) {
  try {
    const result = await insertData(req, res);
    if (result > 0) {
      res.json({ message: 'Datos insertados correctamente' });
    } else {
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  } catch (err) {
    console.error(`Error while inserting items `, err.message);
    next(err);
  }
});

//Obtener Datos
app.get('/getItems', async function (req, res, next) {
  try {
    res.json(await items.getData());
  } catch (err) {
    console.error(`Error while getting items `, err.message);
    next(err);
  }
});


//Eliminar datos
app.delete('/deleteDataByID/:itemId', async function (req, res, next) {
  try {
    const itemId = req.params.itemId;
    const result = await items.deleteDataByID({ id: itemId });
    if (result > 0) {
      res.json({ affectedRows: result });
    } else {
      res.status(500).json({ error: 'Error al eliminar el registro' });
    }
  } catch (err) {
    console.error(`Error while deleting item `, err.message);
    next(err);
  }
});

 