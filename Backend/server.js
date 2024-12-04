import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import AllRoutes from "./routes/index.js"

const app = express();
app.use(cors())
app.use(express.json())
dotenv.config()
connectDB()

app.use("/api/templates",AllRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running successfully on ${process.env.PORT}`)
})