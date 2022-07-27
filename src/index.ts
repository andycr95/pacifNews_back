import express from 'express'
import userRouter from './routes/users'
import mongoose from 'mongoose'

// URI conection
const MONGO_URI = 'mongodb+srv://pacificode:pacificode2020@cluster0.jxebb.mongodb.net/eclass?retryWrites=true&w=majority'

// mongodb connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connect to DB'))
  .catch(err => console.log(err))

const app = express()
app.use(express.json())
const PORT = 3000

app.use('/api/dairies', userRouter)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
