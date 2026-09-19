import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
        process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
});

const connectDB = async () => {
    try {
        const client = await pool.connect();

        console.log("PostgreSQL Connected");

        client.release();
    } catch (error) {
        console.error("PostgreSQL Connection Error:", error.message);
        process.exit(1);
    }
};

export { pool };
export default connectDB;