import dotenv from "dotenv";
import errorHandler from "./Middlewares/errorHandler.js";
import connectDB from "./config/db.js";
import questionRoutes from "./Routes/questionRouter.js";
import userRoutes from "./Routes/userRouter.js";
import userPerformanceRoutes from "./Routes/userPerformanceRouter.js";
import bodyParser from "body-parser";
import express from "express";
import cors from "./Middlewares/cors.js";
import speechRoutes from "./Routes/speechRouter.js";
import geminiRoutes from "./Routes/geminiRouter.js";

dotenv.config();
connectDB();
const app = express();
const port =  5000;

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use('/api/user-performance', userPerformanceRoutes);
app.use('/api/speech', speechRoutes);
app.use('/api/gemini', geminiRoutes);


// error handler
app.use(errorHandler);
// Server

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});


// Todos:
// -**POST /api/users**- Register a users
// -**POST /api/users/auth**- Authenticate a user and get token
// -**POST /api/users/logout**- logou user and clear cookie
// -**GET /api/users/profile**- Get user Profile
// -**PUT /api/users/profile**- Update user Profile
