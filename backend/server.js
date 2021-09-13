const express = require('express')
const cors = require('cors')
const path = require('path')
require('./db/db')
const dotenv = require('dotenv');

const login = require('./routes/login')
const register = require('./routes/register')
const auth = require('./routes/auth')
const card = require('./routes/card')
const infoGit = require('./routes/infoGit')
const user = require('./routes/user')

dotenv.config();
const app = express()
const port = process.env.PORT || 4000

app.use(express.static(path.join(__dirname, '../', 'frontend', 'build')))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/login', login)
app.use('/register', register)
app.use('/auth', auth)
app.use('/card', card)
app.use('/infoGit', infoGit)
app.use('/user', user)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'frontend', 'build', 'index.html'))
})

app.listen(port, () => {
  console.log(`Server run on port:${port}`);
})
