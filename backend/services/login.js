const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function getUserData (user, password) {
    const rows = await db.query(`
            Insert into usuarios
            (nombre, login, password, rol)
            values ('Marcos','muij','julio',"estudiante")
    `)

    /*SELECT nombre, rol 
            FROM usuarios 
            where login='${user}' 
            AND password='${password}'*/
    const data = helper.emptyOrRows(rows[0])

    return {
        data 
    }
}

module.exports = {
    getUserData
}
