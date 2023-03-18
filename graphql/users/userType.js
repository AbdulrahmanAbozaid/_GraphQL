const {
  GraphQLObjectType,
  GraphQLList: List,
  GraphQLNonNull: NonNull,
  GraphQLInt: Int,
  GraphQLString: String,
  GraphQLID: ID,
} = require("graphql");
const BookType = require("../books/bookType");
const bookRepo = require("../../model/book/book.repo");

const UserType = new GraphQLObjectType({
  name: "user",
  description: "This is a user object",
  fields: () => ({
    id: {
      type: NonNull(ID),
      description: "userID",
    },
    name: {
      type: NonNull(String),
    },
    email: {
      type: NonNull(String),
    },
    password: {
      type: NonNull(String),
    },
    address: {
      type: NonNull(String),
    },
    books: {
      type: List(BookType),
      resolve: async (user) => {
        let { books } = await bookRepo.list({ userId: user.id });
        return books;
      },
    },
  }),
});

module.exports = UserType;
