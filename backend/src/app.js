import cookieParser from 'cookie-parser';
import express  from 'express';
import cors from "cors"

const app = express()

app.use(cors({
    origin:  process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials:true
}))

app.use(express.json({limit:"20kb"})) // it allows json 

app.use(express.urlencoded({extended:true,limit:"16kb"})) // extended allow to nesting the payload

app.use(express.static("public")) // for public static asset

app.use(cookieParser())

app.use((err, req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
});


// routes import
import roleRouter from './routes/role.router.js';
import userRouter from './routes/user.router.js';
import { ApiError } from './utils/ApiError.js';

// routes declaration
app.use("/api/v1/user",userRouter)
app.use("/api/v1/role",roleRouter)
export {app}