const mysql     = require('mysql')
const conn      = mysql.createConnection({
                    host:process.env.HOST,
                    user:process.env.USER,
                    database:process.env.DB,
                    password:process.env.PASSWORD,
                })
conn.connect()

module.exports = conn
