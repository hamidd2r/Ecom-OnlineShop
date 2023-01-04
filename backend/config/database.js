const mongoose = require('mongoose')
// mongoDB connection....................................

const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(()=>{
        console.log('database connection successfully... ')
      })
      .catch((err) => {
        console.log(err);
      });
}
module.exports = connectDatabase
