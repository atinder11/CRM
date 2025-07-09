
const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Tech', 'Sales', 'Management'] },
  position: { type: String, required: true }
}, { timestamps: true,
     versionKey: false
 });

module.exports = mongoose.model('Register', RegisterSchema);
