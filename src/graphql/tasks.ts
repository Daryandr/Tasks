import gql from 'graphql-tag'

export const TASKS = gql`query Query {
    tasklist {
        tasks {
            title
            checklist {
                checked
                name
            }
        }
    }
}`