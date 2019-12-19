const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const AnswersType = new GraphQLObjectType({
    name: 'Answers',
    fields: () => ({
        text: { type: GraphQLString },
        question: { type: GraphQLID },
    })
});

module.exports = AnswersType;
