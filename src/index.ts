import express from 'express'
import userRouter from './routes/users'
import articleRouter from './routes/articles'
import newsRouter from './routes/news'
import firebaseRouter from './routes/firebase'
import tvgrillRouter from './routes/micelaneus'
import notificationRouter from './routes/notification'
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

// CORS configuration
app.use(function (_req: any, res: { header: (arg0: string, arg1: string) => void }, next: () => void) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

app.use('/api/users', userRouter)
app.use('/api/articles', articleRouter)
app.use('/api/news', newsRouter)
app.use('/api/firebase', firebaseRouter)
app.use('/api/micelaneus', tvgrillRouter)
app.use('/api/notification', notificationRouter)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
