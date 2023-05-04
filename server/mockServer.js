import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {typeDefs} from "./types.js";
import {resolvers} from "./resolvers.js";
import {mocks} from "./mocks.js";
import config from "./config.js"

const server = new ApolloServer({
    schema: addMocksToSchema({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        mocks,
        preserveResolvers: true
    }),
});

const { url } = await startStandaloneServer(server, { listen: { port: config.port } });

console.log(`Server listening at: ${url}`);