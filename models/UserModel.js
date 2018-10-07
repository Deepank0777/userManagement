let mongoose = require('mongoose');

var Schema = mongoose.Schema;
// ID First Name Last Name Company Name  Age  City State Zip Email Web

var userSchema = new Schema({
  id:{
    type: Number,
    required: true,
    unique:true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  state:{
    type: String,
    required: true
  },
  zip: {
    type: Number,
    required: true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  web: {
    type: String,
    required: true,
  }
}, { collection: 'user' });
 
module.exports = mongoose.model('User', userSchema);