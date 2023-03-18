const {
  GraphQLObjectType,
  GraphQLList: List,
  GraphQLNonNull: NonNull,
  GraphQLInt: Int,
  GraphQLString: String,
  GraphQLID: ID,
} = require("graphql");

const BookType = new GraphQLObjectType({
  name: "book",
  description: "This is a book object",
  fields: () => ({
    id: {
      type: NonNull(ID),
      description: "book id",
    },
    userId: {
      type: NonNull(ID),
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
