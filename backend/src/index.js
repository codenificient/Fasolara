import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const db = process.env.MONGO_URI || 'mongodb://localhost:27017/fasolara'

// MIDDLEWARES
app.use(express.json())

const port = process.env.PORT || 3001

app.get('/', (req, res) => {
	res.send('<h1>Hello from Nodemon</h1>')
})

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('MongoDB connected')
	})
	.catch((err) => console.log(err))

app.listen(port, () => {
	console.log(`App running on port ${port}`)
	// console.log(process.env.PORT)
})
