// Packages
import path from "path";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import https from "https";
import errorHandler from "./middlewares/errorMiddleware.js"
import cloudinary from "cloudinary"
import fileUpload from "express-fileupload"

// SECURITY PACKAGES
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";

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
// app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://picknshop.render.com", "http://localhost:5173"],
//     credentials: true,
//   })
// );
app.use(fileUpload());

//_________MIDDLEWARES_________//
// 1)_[SECURITY]-{CROSS_SITE_SCRIPTING(XSS)}_HELMET_HEADERS_
// @desc Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!, The top-level helmet function is a wrapper around 15 smaller middlewares, using it at top level in middlewares stack.
app.use(helmet());

// 2)_[SECURITY]-{BRUTE_FORCE_ATTACK_&_DENIAL_OF_SERVICE(DOS)_ATTACK}_RATE_LIMITING_
// @descOfAttack[BRUTE_FORCE_ATTACK] A brute force attack is a commonly used attack for cracking passwords. These attacks are the cyber-equivalent of a situation we often see in movies: a door is locked, and a character has a key ring with no idea of which key fits into the lock. Time is running out. The owner will be there any moment now. So, the person tries one key after another, quickly, till one key fits. That’s a brute force attack for you. The attackers keep trying multiple combinations of usernames and passwords till they find one that works.
// @descOfAttack[DENIAL_OF_SERVICE(DOS)_ATTACK] A Denial-of Service (DOS) attack is intended to shut down a website/system so that users are unable to access it. This is done by sending junk requests to overwhelming the site/system.
// @protection we used a rate limiter to number of requests done per amount of time by using (express-rate-limiter)
const limiter = rateLimit({
  // maximum 500 requests per hour
  max: 5000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests, please try again in one hour",
});

app.use(process.env.API_URL, limiter);

// 3) Morgan (HTTP requests LOGGER)
// if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// 4) Body parser (express.json() is a built express middleware that convert request body to JSON)
app.use(
  express.json({
    // 	Controls the maximum request body size
    limit: "15kb",
  })
);

// 5)_[SECURITY]-{CROSS_SITE_SCRIPTING(XSS)_&_NO_SQL_INJECTION_ATTACK}_DATA_SANITIZATION_
// @descOfAttack[NO_SQL_INJECTION_ATTACK] NoSQL injection is a vulnerability that lets a malicious hacker introduce (inject) undesired code into database queries executed by NoSQL databases.
// @descOfAttack[CROSS_SITE_SCRIPTING(XSS)] Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application uses input from a user within the output it generates without validating or encoding it. An attacker can use XSS to send a malicious script to an unsuspecting user. The end user’s browser has no way to know that the script should not be trusted, and will execute the script. Because it thinks the script came from a trusted source, the malicious script can access any cookies, session tokens, or other sensitive information retained by the browser and used with that site. These scripts can even rewrite the content of the HTML page.
// a)protect from No Sql Injection
app.use(mongoSanitize());

// b)protect from xss
app.use(xss());

// 6) HPP (protect against HTTP Parameter Pollution)
app.use(
  hpp({
    // whitelist: [
    //   "quantityInStock",
    //   "price",
    //   "discount",
    //   "sold",
    //   "ratingAverage",
    //   "ReviewsNumber",
    //   "category",
    // ],
  })
);

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

// Payment - Paystack

// app.get("/api/paystack", function (req, res) {
//   const params = JSON.stringify({
//     email: "customer@email.com",
//     amount: "20000",
//   });

//   const options = {
//     hostname: "api.paystack.co",
//     port: 443,
//     path: "/transaction/initialize",
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//       "Content-Type": "application/json",
//     },
//   };

//   const request = https
//     .request(options, (response) => {
//       let data = "";

//       response.on("data", (chunk) => {
//         data += chunk;
//       });

//       response.on("end", () => {
//         res.send(data)
//         console.log(JSON.parse(data));
//       });
//     })
//     .on("error", (error) => {
//       console.error(error);
//     });

//   request.write(params);
//   request.end();
// });

// Upload
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.get("/", (req, res) => {
  res.send("Home Page...");
});


//Error Middleware
app.use(errorHandler);

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

app.listen(PORT, () => console.log(`Server is running on port ${PORT} 😁`));

/* mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err)); */
