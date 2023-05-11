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

const sqlCreatetable = `
    CREATE TABLE IF NOT EXISTS people(
    id int not null auto_increment,
    name varchar(255),
    primary key(id)
    ) ENGINE=MEMORY`

const sql = `INSERT INTO people(name) values('fabiano')`
connection.query(sqlCreatetable)
connection.query(sql)

const sqlQueryNames = "SELECT * FROM people"
let names = []
let template = '<h1>Fullcycle</h1>'
connection.query(sqlQueryNames, function (err, result, fields) {
    if (err) throw err;
    names = result

    template = `
    <h1>Fullcycle</h1>
    <ol>
     ${names.map(name => {
        return `<li> ${name.name} </li>`
     }).join(' ')}
    </ol>`
  })

connection.end()
app.get('/', (req, res) => {

    res.send(template)
})

app.listen(port, () => {
    console.log("rondando na porta "+ port)
})