const express = require('express')
const mysql = require('mysql')

var pool

const environment = "DEVELOPMENT"
console.log(`Starting app in ${environment} mode.`)

// Create thread pool by connecting to db
if (process.env.DATABASE_URL && environment == "PRODUCTION") {
  pool = mysql.createPool(process.env.DATABASE_URL)
} else {
  pool = mysql.createPool({
    host: 'localhost',
    user: 'commute_user',
    password: 'greenbean',
    database: 'commute',
  })
}

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
/*
  /
  Type: GET
  Input: 
  Ouput:
*/
app.get('/', (req, res) => {
  res.send('Welcome to commute app')
})

/*
  /transportation-types
  Type: GET
  Input: 
  Output: all of the transportation types from the transport_lookup table
*/
app.get('/transportation-types', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  pool.query('SELECT * FROM transport_lookup', (error, results, fields) => {
    if (error) throw error
    res.json(results)
  });
})

/*
  /user/new
  Type: POST
  Input: body {name, distance}
  Output: response from db
*/
app.post('/user/new', (req, res) => {
  const user = {name: req.body.name, distance: req.body.distance}
  console.log(req.body)
  pool.query('INSERT INTO users SET ?', user, (error, results, fields) => {
    if (error) return res.status(422).send("Duplicate Entry in User table")
    res.send(results)
  })
})

/*
  /user/:id
  Type: GET
  Input: id
  Output: users that match
*/
app.get('/user/id/:id', (req, res) => {
  pool.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (error, results, fields) => {
    if (error) throw error
    res.send(results)
  })
})

app.get('/user/all', (req, res) => {
  pool.query('SELECT name, id FROM users', (error, results, fields) => {
    if (error) throw error
    res.send(results)
  })
})

/*
  /commute/new
  Type: POST
  Input: body {user_id, transport_mode_id}
  Output: response from db 
*/
app.post('/commute/new', (req, res) => {
  const commute = {user_id: req.body.user_id, transport_mode_id: req.body.transport_mode_id}
  pool.query('INSERT INTO commute_log SET ?', commute, (error, results, fields) => {
    if (error) throw error;
    res.send(results)
  })
})

app.get('/commute/user/:id', (req, res) => {
  pool.query(`SELECT * FROM commute_log WHERE user_id = ${req.params.id}`, (error, results, fields) => {
    if (error) throw error
    res.send(results)
  })
})

app.listen(process.env.PORT || 3001, () => {
  console.log('Commute app is listening.')
})
