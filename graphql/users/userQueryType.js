const {
  GraphQLObjectType,
  GraphQLList: List,
  GraphQLNonNull: NonNull,
  GraphQLInt: Int,
  GraphQLString: String,
} = require("graphql");

const UserQueryType = new GraphQLObjectType({
  name: "userQuery",
  description: "This is a user query object",
  fields: () => ({
    // CREATE
    // UPDATE
    // DELETE
    // LIST
    // GET_BY_ID
  }),
});

module.exports = UserQueryType;
