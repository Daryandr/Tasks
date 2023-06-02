import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client/core'
import config from '@/../config'

// HTTP connection to the API
const httpLink = createHttpLink({
    uri: config.server.url,
})

// Cache implementation
const cache = new InMemoryCache({
    addTypename: false
})

// Create the apollo client
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})