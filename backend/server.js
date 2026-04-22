import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', authRoutes)
app.use('/users', userRoutes)



app.listen(5000, () => {
  console.log('Server running on port 5000')
})