const Status  = require('../models/Status')
const { Router } = require('express')
const Question = require('../models/Question')
const Users = require('../models/User')
const router = Router()


router.get('/', async (req, res) => {
    const questions = await Question.find({})
  
    res.render('index', {
      title: 'Cписок вопросов',
      isIndex: true,
      questions
    })
  })
  
router.get('/create', (req, res) => {
    res.render('createQuestion', {
        title: 'Создать вопрос',
        isCreate: true
    })
})

router.post('/delete', async (req, res) => {
  const { id } = req.body

  await Question.remove({ _id: id })
  res.redirect('/')
})
  
router.post('/create', async (req, res) => {
    const { required, text } = req.body

    const question = new Question({required, text})
    await question.save()
    res.redirect('/')
})

router.get('/users', async (req, res) => {
  const users = await Users.find({})

  res.render('users', {
      title: 'Пользователи',
      isCreate: true,
      users
  })
})

router.post('/subscribe', async (req, res) => {
  const { id, subscribe } = req.body

  await Users.updateOne({_id: id}, { subscribe });
  res.redirect('/users')
})

module.exports = router
