const { User } = require('../models')

const dailyDischarge = async () => {
    // сброс прогресса с прошлого дня
    await User.updateMany({status: { '$ne' : 'work'}, date_comeback: { '$lte' : Date.now() }}, { status: 'work' })
    await User.updateMany({}, { daily_report: true })
}

module.exports = dailyDischarge;