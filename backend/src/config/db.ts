import mongoose from "mongoose";
import { mongoUri } from "../constants/env";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log(`Connected to the Database!`)
  } catch (error) {
    console.log(`Could not connect to the database!`, error);
    process.exit(1);
  }
};
