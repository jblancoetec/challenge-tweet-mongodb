import { connect, connection, disconnect } from "mongoose";
import { TweetCollection } from "../models/Tweet";
import { tweets } from "./tweets";

export const destroyDB = async () => {
  try {
    await TweetCollection.deleteMany({});
  } catch (error) {
    console.log("Error al eliminar la base de datos");
  } finally {
    await disconnect();
  }
};

export const createASmallDB = async () => {
  try {
    const uridb = process.env.URIDB || "mongodb://localhost:27017/test";
    await connect(uridb);
    await TweetCollection.deleteMany({});
    await TweetCollection.create(tweets.slice(0, 10));
  } catch (error) {
    console.log("Error al crear la base de datos");
    await disconnect();
  }
};
