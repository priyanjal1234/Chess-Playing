import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "https://chess-playing.vercel.app",
    credentials: true
}))

export default app
