const graphql = require('graphql');
const { Answer, User } = require('../models')
const UserType = require('./user')
const AnswerType = require('./answers')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        user: { 
            type: UserType,  
            args: { user: { type: GraphQLID } }, 
            resolve(parent, _) {
                return User.findById(parent.user._id);
            }
        },
        answers: { 
            type: new GraphQLList(AnswerType),
            args: {
                questionIdsExclude: { type: new GraphQLList(GraphQLID) }
            },    
            resolve(parent, args) {
                return Answer.find({_id: {$in: parent.answers}, question: {$nin: args.questionIdsExclude}})
            }
        },
        date: { type: GraphQLString }
    })
});

module.exports = StatusType;
