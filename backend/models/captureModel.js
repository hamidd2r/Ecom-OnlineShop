const mongoose = require("mongoose");


const captureSchema = new mongoose.Schema({
 
  account_id: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Capture", captureSchema);
