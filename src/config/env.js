import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/shipnow-api-85760",
  nodeEnv: process.env.NODE_ENV || "development"
};