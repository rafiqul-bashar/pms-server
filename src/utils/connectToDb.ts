import mongoose from "mongoose";

export default async function connectDB() {
  const mongoURI = Bun.env.MONGODB_URI ?? "mongodb://localhost:27017/pmsnew";

  try {
    await mongoose.connect(mongoURI).then(() => {
      console.log("DB CONNECTED!");
    });
  } catch (error) {
    const castedError = error as Error;
    console.error(castedError.message);
  }

  mongoose.connection.on("open", () => {
    console.log(`Database connected!!`);
  });
  mongoose.connection.on("close", () => {
    console.error(`Database connection stopped!!`);
  });
  mongoose.connection.on("error", (err) => {
    console.error(`Database connection error: ${err}`);
  });
}
