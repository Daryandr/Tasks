import gql from 'graphql-tag'

export const ADD_TASK = gql`mutation add($task: inpTask!){
    addTask(task: $task)
}`