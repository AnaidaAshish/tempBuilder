import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("MongoDb Connected Successfully");
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
