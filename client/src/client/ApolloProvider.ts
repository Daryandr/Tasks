import {createApolloProvider} from '@vue/apollo-option'
import {apolloClient} from './ApolloClient'

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})