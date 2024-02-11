import mongoose, { connection } from "mongoose";

export const connected = {
  isConnected: false,
};

export async function connectDB() {
  if (connected.isConnected) {
    return;
  }

  const db = await mongoose.connect("mongodb://localhost/learning-crud");
  console.log(db.connection.db.databaseName);

  connected.isConnected = db.connections[0].readyState === 1;
}

connection.on("connected", () => {
  console.log("Mongoose is connected");
});

connection.on("error", (err) => {
  console.log("Mongoose error", err);
});
