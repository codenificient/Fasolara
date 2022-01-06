const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const { graphqlHTTP } = require('express-graphql')

dotenv.config()

// Setup database
const db = process.env.MONGO_URI || 'mongodb://localhost:27017/fasolara'

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('MongoDB connected')
	})
	.catch((err) => console.log(err))

// Import application routes
const addressRoutes = require('./routes/address')

const app = express()

// MIDDLEWARES
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3001

// Setup application routes
app.get('/', (req, res) => {
	res.send('<h1>Hello from Express backend</h1>')
})

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
)


app.use('/api', addressRoutes)



app.listen(port, () => {
	console.log(`App running on port ${port}`)
	// console.log(process.env.PORT)
})
