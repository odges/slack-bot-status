const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLString, GraphQLNonNull } = graphql;
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
        updateUserSub: {
            type: UserType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                subscribe: {type: new GraphQLNonNull(GraphQLBoolean)}
            },
            resolve(parentValue, args){
                return new Promise((resolve, reject) => {
                    User.findOneAndUpdate(
                        {"_id": args.id},
                        { "$set": { subscribe: args.subscribe} },
                        {"new": true}
                    ).exec((err, res) => {
                        if(err) reject(err)
                        else resolve(res)
                    })
                })
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
        },
        createQuestion: {
            type: QuestionType,
            args: {
                text: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return new Promise((resolve, reject) => {3
                    Question.create({text: args.text}).exec((err, res) => {
                        if(err) reject(err)
                        else resolve(res)
                    })
                })
            }
        },
        deleteQuestion: {
            type: QuestionType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return new Promise((resolve, reject) => {
                    Question.deleteOne({_id: args.id}).exec((err, res) => {
                        if(err) reject(err)
                        else resolve(res)
                    })
                })
            }
        },
        questionRequired: {
            type: QuestionType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                required: {type: new GraphQLNonNull(GraphQLBoolean)}
            },
            resolve(parentValue, args){
                return new Promise((resolve, reject) => {3
                    Question.findOneAndUpdate(
                        {_id: args.id},
                        { "$set": { required: args.required} },
                        { "new": true }
                    ).exec((err, res) => {
                        if(err) reject(err)
                        else resolve(res)
                    })
                })
            }
        }
	}
});


module.exports = new GraphQLSchema({ query: RootQuery })
