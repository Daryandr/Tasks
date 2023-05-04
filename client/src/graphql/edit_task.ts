import gql from 'graphql-tag'

export const EDIT_TASK = gql`mutation edit($taskId: Int!,$task: inpTask! ){
    editTask(taskId: $taskId, task: $task)
}`