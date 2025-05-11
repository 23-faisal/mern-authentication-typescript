import "dotenv/config";

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
};

// Database
export const mongoUri = getEnv("MONGO_URI");

// Environment
export const nodeEnv = getEnv("NODE_ENV");
export const port = parseInt(getEnv("PORT"));

// JWT
export const jwtSecret = getEnv("JWT_SECRET");
export const jwtRefreshSecret = getEnv("JWT_REFRESH_SECRET");

// Application
export const appOrigin = getEnv("APP_ORIGIN");

// Email
export const emailSender = getEnv("EMAIL_SENDER");
export const resendApiKey = getEnv("RESEND_API_KEY");
