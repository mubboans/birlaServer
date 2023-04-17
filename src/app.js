require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const path =require('path')
const connectDB = require('./dbconfig/dbonfig')
const invoiceroute = require ('./routes/invoice_route')
const {port}  = require('./config/config')
const cors = require('cors');
const apiErrorHandler = require('./error/api-error-handler')

const itemroute = require('./routes/item_Detail_route')
app.get('/data', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use('/invoice',itemroute);
app.use('',invoiceroute)
app.use('/users', require('./routes/users'));
app.use(apiErrorHandler);

 
app.use('**/**',function(req, res, next) {

  res.status(404);
  res.sendFile(path.join(__dirname, './public/404-not-found.html'))
}
);




app.get('/data', (req, res) => {
  res.send('Hello World!')
})



// app.use(express.urlencoded({extended: false}))

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