const express = require('express')
const app = express()
const connectDB = require('./dbconfig/dbonfig')
const port = 8000
const userroute = require('./route/user_route')
app.get('/data', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());
app.use('',userroute) 
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