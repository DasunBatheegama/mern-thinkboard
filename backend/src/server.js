import express from "express"
import dotenv from "dotenv";
import cors from "cors";
// const express = require("express");
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001


// middleware
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

// our simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRouter);

// What is an Endpoint?
// An endpoint is a combination of a URL + HTTP method that lets the client interact with a specific resource.

// app.get("/api/notes", (req, res) => {
//     res.status(200).send("you got 20 notes");
// });

// app.post("/api/notes", (req, res) => {
//     res.status(201).json({"message": "Note created successfully"});
// });

// app.put("/api/notes/:id", (req, res) => {
//     res.status(200).json({"message": "Note updated successfully!"});
// });

// app.delete("/api/notes/:id", (req, res) => {
//     res.status(200).json({"message": "Note deleted successfully!"});
// });

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port:", PORT);
    });
});



