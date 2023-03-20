module.exports = {
    client: {
        service: {
            name: 'notes',
            // URL to the GraphQL API
            url: 'https://rickandmortyapi.com/graphql',
        },
        // Files processed by the extension
        includes: [
            'src/**/*.vue',
            'src/**/*.js',
        ],
    },
}