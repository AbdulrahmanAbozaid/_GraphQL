const { GraphQLObjectType } = require("graphql");
const UserQueryType = require("./users/userQueryType");
const BookQueryType = require("./books/bookQueryType");

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  description: "This is the root object for Queries",
  fields: () => ({
    user: {
      type: UserQueryType,
      description: "List Of Users",
      resolve: () => ({}),
    },
    book: {
      type: BookQueryType,
      description: "List Of Books",
      resolve: () => ({}),
    },
  }),
});

module.exports = RootQueryType;
