import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import cors from 'cors';

import models from './models/index';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app = express();
app.use(cors('*'));

const graphqlEndpoint = '/graphql';

app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      models,
      user: {
        id: 1
      }
    }
  })
);
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

const port = process.env.NODE_ENV || 8080;

models.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Listening on Port ${port}`));
});
