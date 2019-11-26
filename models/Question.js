const { Schema, model } = require('mongoose')

const schema = new Schema({
  text: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  }
})

module.exports = model('Question', schema)