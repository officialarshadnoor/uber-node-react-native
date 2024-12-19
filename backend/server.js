import { createServer } from "http";
import app from "./app.js";
import connectDB from "./db/db.js";

const port = process.env.PORT || 1200;

const server = createServer(app);

connectDB();

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})