const {
  GraphQLObjectType,
  GraphQLList: List,
  GraphQLNonNull: NonNull,
  GraphQLInt: Int,
  GraphQLString: String,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "user",
  description: "This is a user object",
  fields: () => ({
    id: {
      type: NonNull(Int),
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
  }),
});

module.exports = UserType;
