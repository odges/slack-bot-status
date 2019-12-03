const { Schema, model } = require('mongoose')

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  answers: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'Answer'
      }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    default: 'reported'
  }
})

module.exports = model('Status', schema)
