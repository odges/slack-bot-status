const graphql = require('graphql');
const { 
    GraphQLObjectType, GraphQLID,
    GraphQLString, GraphQLBoolean
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLID }, 
        name: { type: GraphQLString },
        mention_name: { type: GraphQLString },
        slack_id: { type: GraphQLString },
        daily_report: { type: GraphQLBoolean },
        on_vacation: { type: GraphQLBoolean },
        subscribe: { type: GraphQLBoolean },
        date_comeback: { type: GraphQLString },
        status: { type: GraphQLString },
        link_ava: { type: GraphQLString}
    })
});

module.exports = UserType