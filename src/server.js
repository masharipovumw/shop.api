import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/Routes.js'

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express.static('./uploads'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/shop/',router)


app.listen(PORT, () => {
    console.log('Server is running on ' + PORT)
})
