import express from "express";
import cors from 'cors';
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import './database/config.db.js';
const app = express();
import whatsappRouter from './routes/Whatsapp.route.js';
import motoRouter from "./routes/Moto.route.js";
import userRouter from "./routes/User.route.js";

 
//middleware
app.use(express.json());
app.use("/api/v1/whatsapp", whatsappRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/motos", motoRouter);
 
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
 
export default app;