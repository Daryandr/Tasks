export const resolvers = {
    Mutation: {
        deleteTask: (_,o) => {
            console.log("Deleted task with index ",o.taskId)
            return `Task deleted`
        },
        editTask: (_,o) => {
            console.log("Task with index ",o.taskId," edited to ",o.task)
            return `Task edited`
        },
        addTask: (_,o) => {
            console.log("Task added ",o.task)
            return `Task added`
        }
    }
};