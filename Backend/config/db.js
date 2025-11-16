import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_REMOTE_URI);
    console.log("MongoDb connected...");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDb;
