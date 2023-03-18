const {
  GraphQLObjectType,
  GraphQLList: List,
  GraphQLInt: Int,
} = require("graphql");
const UserMutaionType = require("./users/UserMutaionType");
const BookMutationType = require("./books/BookMutaionType");

const UserType = require("./users/userType");
const BookType = require("./books/bookType");
const bookRepo = require("../model/book/book.repo");
const userRepo = require("../model/user/user.repo");

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  description: "This is the root object for Queries[GET]",
  fields: () => ({
    user: {
      type: new List(UserType),
      description: "List Of Users",
      resolve: async () => (await userRepo.list({})).users,
    },
    book: {
      type: new List(BookType),
      description: "List Of Books",
      args: {
        page: {
          type: Int,
          description: "Page Number",
          defaultValue: 1,
        },
        limit: {
          type: Int,
          description: "Limit Number",
          defaultValue: 5,
        },
      },
      resolve: async (_, { page, limit }) =>
        (await bookRepo.list({}, { page, limit })).books,
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "RootMutation",
  description: "This is the root object for Mutations[PUT, POST, DELETE]",
  fields: () => ({
    user: {
      type: UserMutaionType,
      description: "Modify User",
      resolve: () => ({}),
    },
    book: {
      type: BookMutationType,
      description: "Modify Book",
      resolve: () => ({}),
    },
  }),
});

module.exports = { RootQueryType, RootMutationType };
