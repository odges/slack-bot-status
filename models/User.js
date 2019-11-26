const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: false
  },
  slack_id: {
    type: String,
    required: true
  }
})

module.exports = model('User', schema)
