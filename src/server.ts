import { Server } from "http";
import { app } from "./app";
import config from "./app/config";
import mongoose from "mongoose";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log("Database Connected");

    server = app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Server error: ", error);
  }
}

main();
