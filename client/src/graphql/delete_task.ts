import gql from 'graphql-tag'

export const DEL_TASK = gql`mutation del($taskId: Int!){
    deleteTask(taskId: $taskId)
}`