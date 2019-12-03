require('dotenv').config();
const Question = require('../models/Question');
const Answer = require('../models/Answer');

const modalQuestions = async (answers = []) => {
	const questions = await Question.find({})
	return {
		token: process.env.SLACK_AUTH_TOKEN,
		view: JSON.stringify({
			"type": "modal",
			"title": {
				"type": "plain_text",
				"text": "Оставить статус",
				"emoji": true
			},
			"submit": {
				"type": "plain_text",
				"text": "Отправить",
				"emoji": true
			},
			"close": {
				"type": "plain_text",
				"text": "Отмена",
				"emoji": true
			},
			"blocks": questions.map((element) => {
				let answer = answers.filter((answer) => answer.question._id.toString() === element.id)[0]
				return {
					"type": "input",
					"block_id": element._id + "_block",
					"element": {
						"action_id": element._id,
						"type": "plain_text_input",
						"initial_value": `${answer ? answer.text : ''}`
					},
					"label": {
						"type": "plain_text",
						"text": element.text,
						"emoji": true
					},
					"optional": element.required
				}
			})
		})
	}
}

module.exports = modalQuestions;