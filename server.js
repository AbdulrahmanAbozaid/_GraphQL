const express = require("express");
const app = express();
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const { RootQueryType, RootMutationType } = require("./graphql/rootObject");
const connection = require("./config/db.connection");
const cors = require("cors");

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

// MidWare
connection();
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "*",
  })
);
// -- GraphQL Endpoint
app.use(
  "/",
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

app.listen(process.env.PORT, () => console.log("Server is up and running!"));
