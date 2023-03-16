const {
  GraphQLObjectType,
  GraphQLList: List,
  GraphQLNonNull: NonNull,
  GraphQLInt: Int,
  GraphQLString: String,
} = require("graphql");

/**(name - title - numOfPages - userId) */
const BookType = new GraphQLObjectType({
  name: "book",
  description: "This is a book object",
  fields: () => ({
    id: {
      type: NonNull(Int),
      description: "book id",
    },
    userId: {
      type: NonNull(Int),
      description: "user id",
    },
    name: {
      type: NonNull(String),
    },
    title: {
      type: NonNull(String),
    },
    numOfPages: {
      type: NonNull(Int),
    },
  }),
});

module.exports = BookType;
