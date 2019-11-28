const { Schema, model } = require('mongoose')

const schema = new Schema({
  text: {
    type: String,
    required: false
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }
})

module.exports = model('Answer', schema)
