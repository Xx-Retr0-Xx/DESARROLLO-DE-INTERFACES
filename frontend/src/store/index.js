import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './storelogin'

/**
 * Creamos un store de redux con la función
   configureStore(). Por ahora esto no hace nada, 
   sólo hemos creado el store.
 */

const store = configureStore({
    /**
     * Añadimos los reducer del Slice que acabamos de crear
     * a nuestro store.
     */
    reducer: {
        login: loginReducer //
    }
    })

export default store
