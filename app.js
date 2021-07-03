import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import 'express-async-errors'
import tweetRouter from './router/tweet.js'
import authRouter from './router/auth.js'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('Hi!')
})

app.use('/tweets', tweetRouter)
app.use('/auth', authRouter)

app.use((error, req, res, next) => {
  console.error(error)
  res.sendStatus(500)
})

app.listen(8080)
