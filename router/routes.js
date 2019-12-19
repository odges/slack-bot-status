const { Router } = require('express')
const { Question, User } = require('../models')
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
    res.redirect('/api/')
})

router.get('/users', async (req, res) => {
  const users = await User.find({})

  res.render('users', {
      title: 'Пользователи',
      isCreate: true,
      users
  })
})

router.post('/subscribe', async (req, res) => {
  const { id, subscribe } = req.body

  await User.updateOne({_id: id}, { subscribe });
  res.redirect('/api/users')
})

module.exports = router
