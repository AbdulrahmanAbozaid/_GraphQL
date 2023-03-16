const {
  GraphQLObjectType,
  GraphQLList: List,
  GraphQLNonNull: NonNull,
  GraphQLInt: Int,
  GraphQLString: String,
} = require("graphql");

const BookQueryType = new GraphQLObjectType({
  name: "bookQuery",
  description: "This is a book query object",
  fields: () => ({
    // CREATE
    // UPDATE
    // DELETE
    // LIST
    // GET_BY_ID
  }),
});

module.exports = BookQueryType;
