/* eslint-disable */
import { MongoClient } from 'mongodb';

const databaseName = 'nextjs-events';
const credentials = `${process.env.DB_USER}:${process.env.DB_PASSWORD}`;

const databaseUrl = `mongodb+srv://${credentials}@cluster0.nadat.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

export const connectToDB = async () => {
  const client = await MongoClient.connect(databaseUrl);
  const db = client.db();
  return { client, db };
};
