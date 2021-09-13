const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}, () => {
  console.log('DataBase Connect');
})
