import express from 'express'
import userRouter from './routes/users'
import helmet from "helmet";
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
app.use(express.json());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
const PORT = 3000;

app.use('/api/users', userRouter)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
