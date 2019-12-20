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
  },
  date_comeback: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    default: 'work'
  },
  link_ava: {
    type: String,
    default: null
  }
})

module.exports = model('User', schema)
