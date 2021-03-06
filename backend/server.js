import express from "express"
import cors from "cors"
import router from './api/makeadish.route.js';

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('Hello from Express!'))
app.use("/", router)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app