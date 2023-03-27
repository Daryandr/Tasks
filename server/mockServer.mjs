import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import casual from 'casual';

const typeDefs = `#graphql
type Query{
    tasklist:TaskList
}
type TaskList{
    tasks: [Task]
}
type Task {
    title:String
    checklist:[Check]
}
type Check{
    name:String
    checked:Boolean
}
`;

const resolvers = {
    Query: {},
    Check:{},
    Task:{},
    TaskList:{}
};


const mocks = {
    Check: () => ({
        name: () => casual.title,
        checked: () => casual.boolean,
    }),
    Task: () => ({
        title: () => casual.title,
        checklist: [...new Array(casual.integer(1, 10))]
    }),
    TaskList: () => ({
        tasks: [...new Array(casual.integer(1, 10))]
    }),
};


const server = new ApolloServer({
    schema: addMocksToSchema({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        mocks,
    }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`Server listening at: ${url}`);