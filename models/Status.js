const { Schema, model } = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  answers: [
      {
        type: String, 
        required: false
      }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('Status', schema)
