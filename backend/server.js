const app = require("./app");
const cloudinary = require('cloudinary')
const connectDatabase = require("./config/database");
const cors = require("cors")
const dotenv = require('dotenv')



app.use(cors())
const Stripe = require('strip')(process.env.SECRET_KEY)


// handling uncaught exception

process.on("uncaughtException" ,(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uuncaught Exception `);
    process.exit(1) 
})

// Config
dotenv.config({
  path: "backend/config/config.env"
});



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
app.all('*', (req,res) => {
    res.json({"every thing":"is awesome"})
})

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})

// fileupload cloudinary 

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
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


