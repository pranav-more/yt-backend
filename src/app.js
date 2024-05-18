import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// for data limit
app.use(
  express.json({
    limit: "16kb",
  })
);

// for data from url
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

// to store files
app.use(express.static("public"));

app.use(cookieParser());

export { app };
