export const typeDefs = `#graphql
type Query{
    tasklist:TaskList
}
type TaskList{
    tasks: [Task]
}
type Task {
    id: ID
    title:String
    checklist:[Check]
}
type Check{
    id: ID
    name:String
    checked:Boolean
}
input inpTask {
    id: ID
    title:String
    checklist:[inpCheck]
}
input inpCheck{
    id: ID
    name:String
    checked:Boolean
}
type Mutation{
    deleteTask(taskId: Int!):String,
    editTask(taskId: Int!,task: inpTask!):String,
    addTask(task: inpTask!):String,
}
`;