import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {Table,TableHead,TableRow,TableCell,TableBody, TableContainer, TextField, Box, Paper, AppBar, Container, Toolbar, Grid, Typography, Button } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import loginImage from './login.jpg';
import { loginActions } from '../store/storelogin';

/**
 * AITOR SÁNCHEZ JIMÉNEZ
 */

function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  
  //Para usar un useState de un objeto con los atributos nombre y marca, se hace así:
  const [item, setItem] = useState({nombre: '', marca: '', tipo: '', precio: ''})

  // Obtiene el nombre y el rol del usuario desde el store. Eso se hace con el hook useSelector()
  const userData = useSelector((state) => state.login);
  console.log(userData); // Comprobamos por la consola qué obtenemos en userData

  // Trozo de código donde vamos a usar el useEffect(): siempre los hooks van al principio del componente
  const isLoggedin = userData.isAutenticated;

  useEffect(() => {
    if (!isLoggedin) {
      navigate('/');
    }
  }, [isLoggedin, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Cambiamos el estado del store a logout si se pulsa el botón
    dispatch(loginActions.logout());
    navigate('/');
  };



const handleSaveItem = async (event) => {
  event.preventDefault();

  try {
    // Verificar que los valores no son undefined antes de enviar la solicitud
    if (item.nombre === undefined || item.marca === undefined || item.tipo === undefined || item.precio === undefined) {
      alert('Error: Alguno de los valores es undefined.');
      return;
    }

    const response = await fetch('http://localhost:3030/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // Cambiado a form-urlencoded
      },
      body: new URLSearchParams(item).toString(), // Cambiado a form-urlencoded
    });

    const result = await response.json();

    if (result.message) {
      alert('Datos guardados con éxito');
      handleGetItems() 
    } else {
      alert('Error al guardar datos');
    }
  } catch (error) {
    console.error('Error during fetch:', error.message);
    alert('Error al conectar con el servidor');
  }
};



const handleGetItems = async () => {
  try {
    const response = await fetch('http://localhost:3030/getItems');
    const result = await response.json();

    if (result.data) {
      setTableData(result.data); // Asumiendo que result.data es un array de objetos con las propiedades correctas
      console.log(result.data)
    } else {
      alert('Error al obtener datos');
    }
  } catch (error) {
    console.error('Error during fetch:', error.message);
    alert('Error al conectar con el servidor');
  }
};




const handleDeleteItem = async (itemId) => {
  try {
    const response = await fetch(`http://localhost:3030/deleteDataByID/${itemId}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (result.affectedRows > 0) {
      alert('El registro se ha eliminado con éxito');
      handleGetItems();
    } else {
      alert('Error al eliminar el registro');
    }
  } catch (error) {
    console.error('Error during fetch:', error.message);
    alert('Error al conectar con el servidor');
  }
};




  return (
    <div>

     {/* APPBAR SUPERIOR */}
     <AppBar position="static">
        <Container>
          <Toolbar>
            <Grid container alignItems="center" justifyContent="space-between">

              <Grid item container xs={6} md={3} lg={2} alignItems="center">
                <AdbIcon />
                <Typography variant="h4"> {userData.userName}</Typography>
              </Grid> 

              <Grid item container xs={6} md={9} lg={10} justifyContent="flex-end">
                <Button color="inherit" component={Link} to="/home" style={{ marginLeft: '10px' }}>
                  Inicio
                </Button>
                <Button color="inherit" component={Link} to="/informes">
                  Informes
                </Button>
                <Button color="inherit" component={Link} to="/ayuda">
                  Ayuda
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>


      {/* FORMULARIO */}
      <Container>
        <Paper elevation={20} fullwidth style={{padding: '2rem', width:'100%' , height: '30vh ', marginTop: '3%', marginLeft:'1%'}}>
          {
            //Container y box generales
            <Box component='form' autoComplete='off' onSubmit={handleSaveItem}> 

    <Grid container alignItems="center" justifyContent="center" style={{ height: '100%', marginLeft:'3%', marginTop:'2%'}}>

                <Grid item xs={6} md= {3}>
                  <TextField
                    id="nombre"
                    label="Nombre"
                    variant="outlined"
                    required
                    value={item.nombre}
                    onChange={(event) => {setItem({...item, nombre: event.target.value})}}                    
                  />
              </Grid>

              <Grid item xs={6} md={3}>
                  <TextField
                    id="marca"
                    label="Marca"
                    variant="outlined"
                    required
                    value={item.marca}
                    onChange={(event) => {setItem({...item, marca: event.target.value})}}                    
                  />
              </Grid>


              <Grid item xs={6} md={3}>
                  <TextField
                    id="tipo"
                    label="Tipo"
                    variant="outlined"
                    required
                    value={item.tipo}
                    onChange={(event) => {setItem({...item, tipo: event.target.value})}}                    
                  />
              </Grid>


              <Grid item xs={6} md={3}>
                  <TextField
                    id="precio"
                    label="Precio"
                    variant="outlined"
                    required
                    value={item.precio}
                    onChange={(event) => {setItem({...item, precio: event.target.value})}}                    
                  />
              </Grid>


              <Grid item xs={6} md={3}>
                <Button
                    type="submit"
                    variant="contained"
                    style={{width:'80%',  height: '7vh', marginTop:'15%'}}
                    alignItems= "center"
                > Insertar Datos
                </Button>
              </Grid>


            <Grid item xs={6} md={3}>
              <Button
                variant="contained"
                marginLeft
                style={{ width: '80%', height: '7vh', marginTop: '15%'}}
                onClick={handleGetItems}
              >
                Obtener Datos
              </Button>
            </Grid>

            </Grid>
          </Box>
    
            }
        </Paper>
      </Container>


      {/* APPBAR DE LA TABLA */}
<AppBar position="static" style={{ marginTop: '40px', backgroundColor: 'black', height: '75px' }}>
  <Container>
    <Toolbar style={{ paddingLeft: '17%', paddingTop: '1%' }}>
      <Grid container alignItems="center" justifyContent="space-between">

        <Typography variant='h7' style={{ color: 'white', flex: 1 }}>
          Nombre
        </Typography>

        <Typography variant='h7' style={{ color: 'white', flex: 1 }}>
          Marca
        </Typography>

        <Typography variant='h7' style={{ color: 'white', flex: 1 }}>
          Tipo
        </Typography>

        <Typography variant='h7' style={{ color: 'white', flex: 1 }}>
          Precio
        </Typography>
      </Grid>
    </Toolbar>
  </Container>
</AppBar>


     {/* CONTENEDOR DE LA TABLA */}
     <Container>
        <Paper elevation={20} fullwidth style={{ padding: '2rem', width: '100%', height: '70vh', overflowX: 'auto', marginTop: '20px', marginLeft: '-2%' }}>
          {/* Utilizamos el componente TableContainer */}
          <TableContainer>
            {/* Utilizamos el componente Table */}
            <Table style={{ minWidth: 650}}>
              {/* Utilizamos el componente TableBody para el cuerpo de la tabla */}
              <TableBody>
                {/* Mapeamos los datos en filas de la tabla */}
                {tableData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell style={{ textAlign: 'left', paddingRight: '5px', paddingLeft: '0' }}>
                      <Button onClick={() => handleDeleteItem(item.id)}>
                        <DeleteForeverIcon />
                      </Button>
                    </TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{item.nombre}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{item.marca}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{item.tipo}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{item.precio}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

    </div>
  );
}

export default Home;