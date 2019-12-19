const graphql = require('graphql');
const { 
    GraphQLObjectType, GraphQLID,
    GraphQLString, GraphQLBoolean
} = graphql;

const QuestionType = new GraphQLObjectType({
    name: 'Question',
    fields: () => ({
        _id: { type: GraphQLID }, 
        required: { type: GraphQLBoolean },
        text: { type: GraphQLString }
    })
});

module.exports = QuestionType