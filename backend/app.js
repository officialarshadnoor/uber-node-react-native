import express from "express";
const app = express();
import { config } from "dotenv";
config();
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/users", userRoutes);

export default app;