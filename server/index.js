import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import cors from 'cors'
import { schema } from './graphql/schema.js'
import { resolvers } from './graphql/resolvers.js'
import { ruruHTML } from 'ruru/server'

const app = express()
app.use(cors())

app.use('/graphql', createHandler({ 
  schema,
  rootValue: resolvers
}))

// Changed from createRouter to using ruruHTML directly
app.use('/playground', (req, res) => {
  res.send(ruruHTML({ endpoint: '/graphql' }))
})

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000')
  console.log('GraphQL Playground available at http://localhost:4000/playground')
})
