const { Schema, model } = require('mongoose')

const schema = new Schema({
  text: {
    type: String,
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: 'Status'
  }
})

module.exports = model('Answer', schema)
