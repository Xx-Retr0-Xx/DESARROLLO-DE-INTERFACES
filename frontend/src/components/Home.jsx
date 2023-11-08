import React from 'react';
import Button from '@mui/material/Button';
import { Avatar, Container, Paper, Typography } from '@mui/material';
import loginImage from './login.jpg';

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux'
import {loginActions}  from '../store/storelogin'; //Importamos el componente lo ginActions que está en el fichero storelogin.js
import { useEffect } from 'react'

/**
 * AITOR SÁNCHEZ JIMÉNEZ
 */


function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

//Obtiene el nombre y el rol del usuario desde el store. Eso se hace
//con el hook useSelector() 

const userData = useSelector(state => state.login)
console.log(userData); //Comprobamos por la consola qué obtenemos en userData

      //Trozo de código donde vamos a usar el useEffect(): siempre los hooks van al principio del componente
      const isLoggedin = userData.isAutenticated

      useEffect(() => {
          if (!isLoggedin) {
          navigate('/')
          }
          
    }, [isLoggedin, navigate])



  const handleSubmit = async (event) => {
  event.preventDefault(); // Evita que la página se recargue al enviar el formulario

  //Cambiamos el estado del store a logout si se pulsa el boton
    dispatch(loginActions.logout())
    navigate('/')
  }


  return (
    <Container maxWidth="lg" textAlign="right" style={{ height: '100vh' }}>
      <Paper elevation={20} style={{ width: '30%', height: '380px', padding: '1rem', ml: 'auto' }}>
        <Avatar
          alt="Avatar"
          src={loginImage}
          style={{
            width: 60,
            height: 60,
            marginBottom: '1rem',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />

      <Typography variant="h1" component="h1" style={{ marginBottom: '1rem', fontSize: '2rem' }}>
        Página home de Aitor Sánchez Jiménez
      </Typography>

      <Typography variant="h2" component="h2" style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
        Nombre de usuario: {userData.userName} || Rol: {userData.userRol}
      </Typography>


      <Button
          type="button" // Establece el tipo de botón en "button" para evitar la recarga de la página
          variant="contained"
          style={{ marginTop: '2rem', width: '60%' }}
          onClick={handleSubmit}
      >
        Salir
      </Button>
      
      </Paper>
    </Container>
  );
}

  export default Home

