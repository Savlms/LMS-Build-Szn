import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import database from './configs/db.config'
const port = process.env.PORT
import router from './routes/index.route'
import cookie from 'cookie-parser'
import cors from 'cors'



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "*",
    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ]
}))
app.use(cookie())

app.get('/', (req, res) => {
    res.send ('Hello, Welcome to SkillHub')
})


app.use("/api/v1", router)


app.listen(port, () => {
    database()
    console.log(`server is started on ${port}`)
})