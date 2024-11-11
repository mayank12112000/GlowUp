import { connectDB, connection } from "../db/index.js";

const runQuery = async (query, params = []) => {
  if (!connection) {
    await connectDB(); // Ensure the connection is established
  }
  try {
    const [results, fields] = await connection.execute(query, params);
    return { results, fields };
  } catch (error) {
    console.error("Error running query:", error);
    throw error;
  }
};
export { runQuery };
