import { createSlice } from '@reduxjs/toolkit'

/**
 * Creamos un estado inicial al que llamo initialAuthState en el
   que esos elementos tomen sus valores iniciales (el usuario no está autenticado y el nombre de usuario y su rol
   son cadenas vacías):
 */

const initialAuthState = {
isAutenticated: false,
userName: '',
userRol: ''
}

//Creamos un State Slice de redux con la función createSlice

const authSlice = createSlice({

    name: 'authentication',
    initialState: initialAuthState,
    reducers: {

        login: (state, action) => {
        const userData = action.payload
        state.isAutenticated = true
        state.userName = userData.name
        state.userRol = userData.rol
},
        logout: (state) => {
        state.isAutenticated = false
        state.userName = ''
        state.userRol = ''
    }
}
})

export const loginActions = authSlice.actions
export default authSlice.reducer