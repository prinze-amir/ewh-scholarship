import mongoose from "mongoose";

export default async function connectMongoDB() {
  if (mongoose.connection.readyState !== 1) {
    try {
      // Only connect if not already connected
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      //process.exit(1);
    }
  }
}
