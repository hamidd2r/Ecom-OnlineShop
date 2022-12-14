const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error')
const fileupload = require('express-fileupload')
const path = require('path')
const dotenv = require('dotenv')

// Config
dotenv.config({
  path: "backend/config/config.env"
});



app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload())
// route import 
const product = require('./routes/productRoute') 
const user = require('./routes/userRoute') 
const order = require('./routes/orderRoute') 
const payment = require('./routes/paymentRoute') 

app.use('/api/v1' , product)
app.use('/api/v1' , user)
app.use('/api/v1' , order)
app.use('/api/v1' , payment)

app.get('/api/getkey' , (req, res)=> res.status(200).json({key:'rzp_test_Ai3D9ADwQQvYN1'}))


// app.use(express.static(path.join(__dirname , "../frontend/build")));

// app.get("*" , (req, res) =>{
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
// })

// middleware
app.use(errorMiddleware)


 

module.exports = app 