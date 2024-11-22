import { connectDB, connection } from "../db/index.js";
import { ApiError } from "./ApiError.js";

const runQuery = async (query, params = []) => {
  if (!connection) {
    await connectDB(); // Ensure the connection is established
  }
  try {
    const [results, fields] = await connection.execute(query, params);
    return { results, fields };
  } catch (error) {
    console.error("Error running query:", error);
    throw new ApiError(500,"database query failed:",error.message);
  }
};
export { runQuery };
