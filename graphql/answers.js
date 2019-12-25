const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const QuestionType = require('./question');
const Question = require('../models/Question');

const AnswersType = new GraphQLObjectType({
    name: 'Answers',
    fields: () => ({
        text: { type: GraphQLString },
        question: { 
            type: QuestionType,
            resolve(parent, _) {
                return Question.findOne({ _id: parent.question._id })
            }
 
        },
    })
});

module.exports = AnswersType;
