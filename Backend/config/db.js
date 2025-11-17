import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // In serverless environments avoid reconnecting on every invocation.
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDb already connected");
      return;
    }

    await mongoose.connect(process.env.MONGO_REMOTE_URI);
    console.log("MongoDb connected...");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDb;
