import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Avatar, Container, Paper, Typography, TextField, Box } from '@mui/material';
import loginImage from './login.jpg';

/**
 * AITOR SÁNCHEZ JIMÉNEZ
 */


function Login() {

  // Declaramos las variables login y password
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');


  // Se crea una función para manejar el envío del formulario:
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

      //Comunica con el backend para verificar las credenciales con el metodo POST
      try {
        const response = await fetch('http://localhost:3030/login', { //Redirección hacia la API del backend
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: login, password }),
        });
        
        const data = await response.json()

        if (login === data.data.login && password === data.data.password) { //Si establece la conexión con el backend mostrará los datos
          window.alert('Inicio de sesión correcto, datos cargados en la consola')
          console.log('Datos correctos:', data.data);

        } else {
          window.alert('Inicio de sesión incorrecto, vuelve a introducir los datos')
          console.log('Credenciales incorrectas.');
        }
      } catch (error) {
        console.error('Error al comunicarse con el backend:', error);
      }
    
  };


  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Paper elevation={20} style={{ padding: '2rem', width: '60%', height: '30hv' }}>

        <Avatar
            alt="Av"
            src={loginImage} // Utiliza la variable importada
            style={{
            width: 60,
            height: 60,
            marginBottom: '1rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            }}
        />

        <Typography variant="h7" component="h5" align='center' style={{ marginBottom: '1rem' }}>
          Iniciar Sesión
        </Typography>

        <Box
          component="form"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            id="login"
            label="Usuario"
            variant="outlined"
            autoFocus
            required
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            style={{ marginTop: '1rem' , width:'70%'}}

          />

          <TextField
            id="password"
            label="Contraseña"
            variant="outlined"
            type='password'
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{ marginTop: '1rem' , width:'70%'}}
          />

          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: '3rem', width:'40%' }}
          >
            Acceder
          </Button>
        </Box>

      </Paper>
    </Container>
  );
}

export default Login;
