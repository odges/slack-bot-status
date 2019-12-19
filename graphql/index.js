const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLList } = graphql;
const { Question, Answer, Status, User } = require('../models')
const UserType = require('./user')
const StatusType = require('./status')
const AnswerType = require('./answers')
const QuestionType = require('./question')

const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: {
		users: {
            type: new GraphQLList(UserType),
			resolve(){
				return User.find({})
			}
        },
        statuses: {
            type: new GraphQLList(StatusType),
			resolve(){
				return Status.find({})
			}
        },
        answers: {
            type: new GraphQLList(AnswerType),
			resolve(){
				return Answer.find({})
			}
        },
        questions: {
            type: new GraphQLList(QuestionType),
            resolve(){
                return Question.find()
            }
        }
	}
});


module.exports = new GraphQLSchema({ query: RootQuery })
