import React from 'react'
import Button from '@mui/material/Button'
import {Container} from '@mui/material';
import {Typography} from '@mui/material';

function Login () {
return <>
<Container>
    <Typography variant="h1" component="h2">App con typography</Typography>
    <Button color="success" variant="contained"> Hola </Button>
</Container>
</>
}
export default Login
