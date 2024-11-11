import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB, connection } from "./db/index.js";
import { runQuery } from "./utils/runQuery.js";
import { SELECT_ROLES } from "./queries/queries.js";
import { asyncHandler } from "./utils/asyncHandler.js";

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

const exampleQuery = asyncHandler(async (req, res, next) => {
  try {
    const { results, fields } = await runQuery(
      { sql: SELECT_ROLES, rowsAsArray: false },
      [1]
    );
    console.log("Query Results:", results);
  } catch (error) {
    console.error("Error executing example query:", error);
  }
});

// Call the example query
exampleQuery();
