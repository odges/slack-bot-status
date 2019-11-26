require('dotenv').config();

const Modal = {
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
	"blocks": [
		{
            "type": "input",
            "block_id": "yesterday_block",
			"element": {
                "action_id": "yesterday",
				"type": "plain_text_input"
			},
			"label": {
				"type": "plain_text",
				"text": "Что делали вчера",
				"emoji": true
			}
		},
		{
            "type": "input",
            "block_id": "today_block",
			"element": {
                "action_id": "today",
				"type": "plain_text_input"
			},
			"label": {
				"type": "plain_text",
				"text": "Что планируете делать сегодня",
				"emoji": true
			}
		},
		{
            "type": "input",
            "block_id": "problems_block",
			"element": {
                "action_id": "problems",
				"type": "plain_text_input"
			},
			"label": {
				"type": "plain_text",
				"text": "Есть проблема с текущими задачами?",
				"emoji": true
			}
		},
		{
            "type": "input",
            "block_id": "tasks_block",
			"element": {
                "action_id": "tasks",
				"type": "plain_text_input"
			},
			"label": {
				"type": "plain_text",
				"text": "Хватает задач на неделю?",
				"emoji": true
			}
		}
    ]}
    )
}

module.exports = Modal;