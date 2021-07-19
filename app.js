import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import 'express-async-errors'
import tweetRouter from './router/tweet.js'
import authRouter from './router/auth.js'
import { config } from './config.js'
import { Server } from 'socket.io'

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

const server = app.listen(config.host.port)
const socketIO = new Server(server, { cors: { origin: '*' } })

socketIO.on('connection', (socket) => {
  console.log('Client is here!')
})

setInterval(() => {
  socketIO.emit('dwitter', 'Hello!')
}, 1000)
