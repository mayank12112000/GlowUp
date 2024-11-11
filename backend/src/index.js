import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB, connection } from "./db/index.js";

dotenv.config({ path: "/.env" });
console.log("PORT from .env:", process.env.PORT);

// Ensure database is connected before starting the server and running the query
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8089, () => {
      console.log("App is running on port:", process.env.PORT || 8089);
    });
  })
  .catch((err) => {
    console.warn("Something went wrong while connecting to DB:", err);
  });

