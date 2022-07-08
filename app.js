import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import accountRouter from './routes/account.js';
import authRouter from './routes/auth.js';
import authTokenRouter from './routes/authToken.js';
import authSessionRouter from './routes/authSession.js';

dotenv.config();

const PORT = process.env.PORT
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.text())
//si no se agrega la rua el middleware funcionará en todas las rutas lo queramos o no
app.use('/account',accountRouter)
app.use('/auth',authRouter)

app.use('/auth-token', authTokenRouter)
app.use('/auth-session', authSessionRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})