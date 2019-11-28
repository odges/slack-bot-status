const { Router } = require('express')
const Question = require('../models/Question')
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
  console.log(id)
  await Question.remove({ _id: id })
  res.redirect('/')
})
  
router.post('/create', async (req, res) => {
    const { required, text } = req.body

    const question = new Question({required, text})
    await question.save()
    res.redirect('/')
})

module.exports = router
