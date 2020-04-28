import * as http from 'http'
import express from 'express'
import { ApolloServer, PubSub } from 'apollo-server-express'
import { typeDefs } from './src/type-defs'
import * as Todos from './src/lists/todos'
import * as ORM from './src/db/init'

const pubsub = new PubSub()

const server = new ApolloServer({ typeDefs, resolvers: Todos.resolvers, context: ({ req, res }) => ({ req, res, pubsub }) })

ORM.init()

const PORT = 4000

const app = express()
app.use('/', express.static('dist'))
server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})
