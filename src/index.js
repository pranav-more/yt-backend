import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "/.env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR:", error);
      throw error;
    });
    app.listen(process.env.PORT || 3001, () => {
      console.log("server is running !!!!!");
    });
  })
  .catch((err) => {
    console.log("mongo db connect fail !!!", err);
  });

/*
import express from "express";
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR:", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
})();
*/
