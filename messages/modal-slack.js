require('dotenv').config();
const Question = require('../models/Question');

const modalQuestions = async () => {
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
				return {
					"type": "input",
					"block_id": element._id + "_block",
					"element": {
						"action_id": element._id,
						"type": "plain_text_input"
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