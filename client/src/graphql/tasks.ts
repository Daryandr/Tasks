import gql from 'graphql-tag'

export const TASKS = gql`query Query {
    tasklist {
        tasks {
            id
            title
            checklist {
                id
                checked
                name
            }
        }
    }
}`