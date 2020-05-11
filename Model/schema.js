var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DataSchema = new Schema({
  sno: {
    type: String,
    Required: true
  },

  name: {
    type: String,
    Required: true
  },

  city: {
    type: String,
    Required: true
  },
  state: {
    type: String,
    Required: true
  },
  countary: {
    type: String,
    Required: true
  },
});
module.exports = mongoose.model('schema', DataSchema);