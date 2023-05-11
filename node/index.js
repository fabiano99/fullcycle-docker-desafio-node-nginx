const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('fabiano')`
connection.query(sql)

const sqlQueryNames = "SELECT * FROM people"
let names = []
let template = '<h1>Fullcycle</h1>'
connection.query(sqlQueryNames, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    names = result

    template = `
    <h1>Fullcycle</h1>
    <ol>
     ${names.map(name => {
        console.log(name.name)
        return `<li> ${name.name} </li>`
     }).join(' ')}
    </ol>`
  })

app.get('/', (req, res) => {

    res.send(template)
})

app.listen(port, () => {
    console.log("rondando na porta "+ port)
})