import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import cors from "cors";
dotenv.config();

const __dirname = path.resolve();

import connectToMongoDB from "./db/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import stripe from "./stripe/stripeInit.js";
import paymentRoutes from "./routes/payment.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

// Content Security Policy
const cspDirectives = {
    defaultSrc: ["'self'"],
    imgSrc: [
        "'self'",
        "data:",
        "https://cdn.magicdecor.in",
        "https://as2.ftcdn.net",
        "https://encrypted-tbn0.gstatic.com",
        "https://wallpapercave.com",
        "https://i.pinimg.com"
    ],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    fontSrc: ["'self'", "data:"],
    connectSrc: ["'self'", "*"], // Adjust based on your API needs
    frameSrc: ["'self'"], // For iframes, if applicable
    objectSrc: ["'none'"] // Disable <object> elements
};

const corOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PATCH',
        'DELETE'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
    ],
    credentials: true
};

//middlewares
app.use(cors(corOpts));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(
    helmet.contentSecurityPolicy({
        directives: cspDirectives,
    })
);

app.get("/api/v1", (req, res) => {
    res.send("<h1>Test...All Up & Running!</h1>");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/payments", paymentRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}`);
    connectToMongoDB();

    if (stripe) {
        console.log("Stripe Initialized");
    } else {
        console.log("Error in connecting to Stripe");
    }
});