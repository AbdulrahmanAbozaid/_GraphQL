const express = require("express");
const app = express();
require("dotenv").config();
const expressGraphQL = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const RootQueryType = require("./graphql/rootObject");
const connection = require("./db.connection");
const cors = require("cors");

const schema = new GraphQLSchema({
  query: RootQueryType,
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
  expressGraphQL({
    graphiql: true,
    schema,
  })
);

module.exports = app;
