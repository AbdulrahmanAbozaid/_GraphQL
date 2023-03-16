const express = require("express");
const app = express();
require("dotenv").config();
const expressGraphQL = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const RootQueryType = require("./graphql/rootObject");

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  "/",
  expressGraphQL({
    graphiql: true,
    schema,
  })
);

app.listen(process.env.PORT, () => console.log("Server is up and running!"));
