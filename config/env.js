import { config } from 'dotenv';
// but we need to have multiple for different env

// Load .env.\<NODE_ENV\>.local, defaulting to "development"
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, NODE_ENV, DB_URI } = process.env;