const app = require("./app");
const cloudinary = require('cloudinary')
const connectDatabase = require("./config/database");
const dotenv = require('dotenv')
const cors = require("cors")



app.use(cors())


// handling uncaught exception

process.on("uncaughtException" ,(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to uuncaught Exception `);
    process.exit(1) 
})

// config
dotenv.config({
  path: "backend/config/config.env"
});

// database
connectDatabase();

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
