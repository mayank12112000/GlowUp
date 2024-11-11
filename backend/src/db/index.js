import mysql from 'mysql2/promise';

let connection; // Store the connection here

// Function to initialize and return the connection
const connectDB = async () => {
    if (!connection) {
        try {
            connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT,
            });
            console.log("MySQL connected successfully!");
        } catch (error) {
            console.error("Cannot connect to MySQL DB:", error);
            process.exit(1);
        }
    }
    return connection;
};

// Export both connectDB and the connection instance
export { connectDB, connection };
