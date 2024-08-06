// Packages
/* import path from "path";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import https from "https";
import errorHandler from "./middlewares/errorMiddleware.js"
import cloudinary from "cloudinary"
import fileUpload from "express-fileupload"

// Utils
//import connectDB from "./config/db.js"
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import orderRoute from "./routes/orderRoute.js";

dotenv.config();
const app = express();

//connectDB()

// Middleware
app.use(express.json());
app.use(cookieParser());
//app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'https://foodstoresch.onrender.com',
  credentials: true,
}));


// Routes
app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

// Upload
app.use("/api/upload", uploadRoute);

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Upload
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.get("/", (req, res) => {
  res.send("Home Page...");
});


//Error Middleware
//app.use(errorHandler);

const PORT = process.env.PORT || 5000;

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connected to MongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => console.log(`Server is running on port ${PORT} 😁`)); */

/* mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err)); */

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import orderRoute from "./routes/orderRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['https://foodstoresch.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.options('*', cors()); // Preflight all routes

// Routes
app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB 👍");
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => console.log(`Server is running on port ${PORT} 😁`));
