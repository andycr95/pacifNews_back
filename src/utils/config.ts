import { config } from "dotenv";

config();

export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
export const AWS_REGION = process.env.AWS_REGION;
export const ORACLE_DB = process.env.ORACLE_DB || "";
export const ORACLE_USER = process.env.ORACLE_USER || "";
export const ORACLE_PASSWORD = process.env.ORACLE_PASSWORD || "";
export const ORACLE_HOST = process.env.ORACLE_HOST || "";