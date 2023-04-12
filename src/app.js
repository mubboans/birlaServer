require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const connectDB = require('./dbconfig/dbonfig')
const port = 8000

app.use(bodyParser.json());

app.get('/data', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', require('./routes/users'));

app.use(express.urlencoded({extended: false}))

app.listen(port,async () => {
  try {
    // console.log(sequelize);
   await connectDB()
    console.log(`Example app listening on port ${port}`)
  }
  catch(err){
    console.log(`Error in connect ${port}`,err)
  }
  
})