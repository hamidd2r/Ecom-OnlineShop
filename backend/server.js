const app = require("./app");
const cloudinary = require('cloudinary')
const connectDatabase = require("./config/database");
const cors = require("cors")
const Capture = require("./models/captureModel");


const crypto = require('crypto')

const {
  MongoClient
} = require('mongodb');
const dotenv = require('dotenv')

const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri);

app.get("/items/:my_item", async (req, res) => {
  let my_item = req.params.my_item;
  let item = await client.db("my_db")
    .collection("my_collection")
    .findOne({
      my_item: my_item
    })

  return res.json(item)
})

app.use(cors())
const Stripe = require('strip')(process.env.SECRET_KEY)


// handling uncaught exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to uuncaught Exception `);
  process.exit(1)
})

// Config
dotenv.config({
  path: "backend/config/config.env"
});

// **************************
app.post('/verification', async(req, res) => {
  const secret = 'hamidali123'
  const {account_id,event}=req.body;

  const capture = await Capture.create({
    account_id,
    event
    
  });

  console.log(capture)

  const shasum = crypto.createHmac('sha256', secret)    
  shasum.update(JSON.stringify(req.body))        
  const digest = shasum.digest('hex')

  console.log(digest, req.headers['x-razorpay-signature'])

  if (digest === req.headers['x-razorpay-signature']) {
    console.log('request is legit')
    //process it 
    res.status(201).json({
      success: true,
      capture,
    });

  } else {
    res.status(201).json({
      message:"error "
     });   
  }
})
// **********************************


// database
connectDatabase();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Routes go here
app.get('/', (req, res) => {
  res.send("home page")
})

//Connect to the database before listening


// fileupload cloudinary 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on port http://localhost${process.env.PORT}`);
});


// unhandle promise rejection...

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to unhandle promise rejection `);

  server.close(() => {
    process.exit(1);
  });
});