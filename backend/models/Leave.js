
const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  reason: { type: String, required: true },
  from: { type: Date, required: true },   
  to: { type: Date, required: true },     
  appliedAt: { type: Date, default: Date.now }
},
   { timestamps: true,
   versionKey: false
 }
);

module.exports = mongoose.model('Leave', leaveSchema);