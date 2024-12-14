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


// routes import
import roleRouter from './routes/role.router.js';
import userRouter from './routes/user.router.js';
import branchRouter from './routes/branch.router.js';
import serviceTypeRouter from './routes/serviceType.router.js';
import serviceRouter from './routes/service.router.js';
import employeeRouter from "./routes/employee.router.js"
import { ApiError } from './utils/ApiError.js';

// routes declaration
app.use("/api/v1/user",userRouter)
app.use("/api/v1/employee",employeeRouter)
app.use("/api/v1/role",roleRouter)
app.use("/api/v1/branch",branchRouter)
app.use("/api/v1/serviceType",serviceTypeRouter)
app.use("/api/v1/services",serviceRouter)


app.use(cookieParser())

app.use((err, req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    console.log(err)
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }
    console.log("error details",err)
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
});

export {app}