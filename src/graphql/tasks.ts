import gql from 'graphql-tag'

export const Tasks = gql`query Query {
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