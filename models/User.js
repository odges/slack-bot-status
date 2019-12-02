const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: false
  },
  mention_name: {
    type: String,
    required: false
  },
  slack_id: {
    type: String,
    required: true
  },
  daily_report: {
    type: Boolean,
    default: false
  },
  on_vacation: {
    type: Boolean,
    default: false
  },
  subscribe: {
    type: Boolean,
    default: false
  }
})

module.exports = model('User', schema)
