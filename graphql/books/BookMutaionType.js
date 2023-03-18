const {
  GraphQLObjectType,
  GraphQLList: List,
  GraphQLNonNull: NonNull,
  GraphQLInt: Int,
  GraphQLString: String,
  GraphQLID: ID,
} = require("graphql");
const BookType = require("./bookType");
const bookRepo = require("../../model/book/book.repo");
const UserType = require("../users/userType");

const BookQueryType = new GraphQLObjectType({
  name: "bookQuery",
  description: "This is a book query object",
  fields: () => ({
    // CREATE
    create: {
      type: BookType,
      description: "Create New book",
      args: {
        userId: {
          type: NonNull(ID),
          description: "user ID",
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
      },
      resolve: async (_, args) => {
        const { book } = await bookRepo.create(args);
        if (book) {
          return book;
        } else throw new Error("book Creation Error");
      },
    },

    // UPDATE
    update: {
      type: BookType,
      description: "Updating a book",
      args: {
        id: {
          type: NonNull(ID),
          description: "bookID",
        },
        userId: {
          type: Int,
          description: "user id",
        },
        name: {
          type: String,
        },
        title: {
          type: String,
        },
        numOfPages: {
          type: Int,
        },
      },
      resolve: async (_, { name, userId, numOfPages, title, id }) => {
        let { book } = await bookRepo.update(id, {
          name,
          userId,
          title,
          numOfPages,
        });
        if (book) {
          return book;
        } else throw new Error("Updating book Error");
      },
    },

    // DELETE
    delete: {
      type: String,
      description: "Deleting a book",
      args: {
        id: {
          type: NonNull(ID),
          description: "bookID",
        },
      },
      resolve: async (_, { id }) => {
        let { error } = await bookRepo.delete(id);
        if (!error) {
          return `book: ${id} has been deleted successfuly`;
        } else throw new Error("Deleting book Error");
      },
    },

    // GET_BY_ID
    getById: {
      type: BookType,
      description: "get book by his ID",
      args: {
        id: {
          type: NonNull(ID),
          description: "book ID",
        },
      },
      resolve: async (_, { id }) => {
        let { book } = await bookRepo.getById(id);
        if (book) {
          return book;
        } else throw new Error("get by ID error");
      },
    },
  }),
});

module.exports = BookQueryType;
