import React from 'react'
import Button from '@mui/material/Button'
import {Box, TextField} from '@mui/material';
import { useState } from 'react';

function Login () {

const [login, setLogin] = useState('')

const isVerifiedUser = () => {
    fetch(`http://localhost:3030/login?user=${login}&password=${'123456789'}`)
    .then(response => response.json())
    .then(response => {
        if (response) {
          console.log(response)   
        }
    })
}

const handleSubmit = (e) => {
    e.preventDefault()
    isVerifiedUser()
    console.log(login)
}

return <>
    <Box component='form' onSubmit={handleSubmit}>
        <TextField 
            id='login' 
            label='Usuario' 
            variant='outlined' 
            fullWidth
            autoFocus

            value={login}
            onChange={(event) => setLogin(event.target.value)}
        />

        <Button 
            type="submit" 
            variant='contained' 
            fullWidth
        >
         Acceder
        </Button>
    </Box>
</>
}
export default Login

/*
<Container>
    <Typography variant="h1" component="h2">App con typography</Typography>
    <Button color="success" variant="contained"> Hola </Button>
</Container>*/