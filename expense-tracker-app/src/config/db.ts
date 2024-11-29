import { Pool } from "pg";
import "dotenv/config"

const pool = new Pool({
  user: "postgres.oikjmoxlqzwjrqgkyhmu",
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  database: "postgres",
  password: "Purwadhika123",
  port: 6543,
});

export default pool;
