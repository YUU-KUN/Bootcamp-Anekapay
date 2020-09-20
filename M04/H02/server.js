const express = require('express')
// const { expressGraphQL } = require('express-graphql')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js')

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))


app.listen(4000, () => {
    console.log('Server berjalan di http://localhost:4000')
})


