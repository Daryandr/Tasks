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
input inpTask {
    title:String
    checklist:[inpCheck]
}
input inpCheck{
    name:String
    checked:Boolean
}
type Mutation{
    deleteTask(taskId: Int!):String,
    editTask(taskId: Int!,task: inpTask!):String,
    addTask(task: inpTask!):String,
}
`;

const resolvers = {
    Mutation: {
        deleteTask: (i) => {
            console.log("Deleted task with index ",i)
            return `Task deleted`
        },
        editTask: (i,o) => {
            console.log("Task with index ",i," edited to ",o)
            return `Task edited`
        },
        addTask: () => {
            return `Task added`
        }
    }
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
        tasks: [...new Array(casual.integer(5, 10))]
    }),
};


const server = new ApolloServer({
    schema: addMocksToSchema({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        mocks,
        preserveResolvers: true
    }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`Server listening at: ${url}`);