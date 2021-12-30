import dotenv from 'dotenv'
import express from 'express'

dotenv.config()
const app = express()

const port = process.env.PORT || 3001

app.get('/', (req, res) => {
	res.send('<h1>Hello from Nodemon</h1>')
})

app.listen(port, () => {
	console.log(`App running on port ${port}`)
	console.log(process.env.PASSWORD)
})
