const {
  GraphQLObjectType,
  GraphQLList: List,
  GraphQLNonNull: NonNull,
  GraphQLInt: Int,
  GraphQLString: String,
  GraphQLID: ID,
} = require("graphql");
const UserType = require("./userType");
const userRepo = require("../../model/user/user.repo");

const UserMutaionType = new GraphQLObjectType({
  name: "userQuery",
  description: "This is a user query object",
  fields: () => ({
    // CREATE
    create: {
      type: UserType,
      description: "Create New User",
      args: {
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
      },
      resolve: async (_, args) => {
        const { user } = await userRepo.create(args);
        if (user) {
          return user;
        } else throw new Error("User Creation Error");
      },
    },

    // UPDATE
    update: {
      type: UserType,
      description: "Updating a user",
      args: {
        id: {
          type: NonNull(ID),
          description: "userID",
        },
        name: {
          type: String,
        },
        email: {
          type: String,
        },
        password: {
          type: String,
        },
        address: {
          type: String,
        },
      },
      resolve: async (_, { name, email, password, address, id }) => {
        let { user } = await userRepo.update(id, {
          name,
          email,
          password,
          address,
        });
        if (user) {
          return user;
        } else throw new Error("Updating User Error");
      },
    },

    // DELETE
    delete: {
      type: String,
      description: "Deleting a user",
      args: {
        id: {
          type: NonNull(ID),
          description: "userID",
        },
      },
      resolve: async (_, { id }) => {
        let { error } = await userRepo.delete(id);
        if (!error) {
          return `user: ${id} has been deleted successfuly`;
        } else throw new Error("Deleting user Error: " + error);
      },
    },

    // GET_BY_ID
    getById: {
      type: UserType,
      description: "get user by his ID",
      args: {
        id: {
          type: NonNull(ID),
          description: "user ID",
        },
      },
      resolve: async (_, { id }) => {
        let { user, error } = await userRepo.getById(id);
        if (user) {
          return user;
        } else throw new Error("get by ID error " + error);
      },
    },
  }),
});

module.exports = UserMutaionType;
