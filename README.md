# GraphQL Task

## Description

1. _GraphQL Schema_

```JS
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
app.use(
  "/",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

```

2. _Root Object_

```JS
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
          defaultValue: 1,
        },
        limit: {
          type: Int,
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
```

3. _Mongoose Schema_

```JS
const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  numOfPages: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 15,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /.+@.+\.(com|org|email)+/,
      "Must match an email address, tlds: [com|org|email]",
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  address: {
    type: String,
    required: true,
  },
  books: [
    {
      type: mongoose.Types.ObjectId,
      ref: "books",
    },
  ],
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

```

4. \_Book and User
   1. Book

`````JS
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
```

```

    2. User
````JS
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
`````

5. _Book and User Mutations_

```JS
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
```
