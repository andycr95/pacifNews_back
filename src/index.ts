import express from 'express'
import userRouter from './routes/users'
import articleRouter from './routes/articles'
import newsRouter from './routes/news'
import uploadRouter from './routes/upload'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'

const app = express()
app.use(express.json())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname+'/uploads'))
app.use(morgan('dev'))
app.use(cors())
const PORT = process.env.PORT || 5000

app.use('/api/users', userRouter)
app.use('/api/articles', articleRouter)
app.use('/api/news', newsRouter)
app.use('/api/upload', uploadRouter)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
