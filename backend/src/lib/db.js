import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected at : ${conn.connection.host}`);
  } catch (error) {
    console.log("Error in mongodb controller:", error);
    process.exit(1);
  }
};

