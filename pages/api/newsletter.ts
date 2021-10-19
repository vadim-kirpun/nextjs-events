import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkIfEmailEmpty } from '../../helpers/validation';

const databaseName = 'nextjs-events';
const credentials = `${process.env.DB_USER}:${process.env.DB_PASSWORD}`;
const mongodbURL = `mongodb+srv://${credentials}@cluster0.nadat.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (checkIfEmailEmpty(email)) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const client = await MongoClient.connect(mongodbURL);
    const db = client.db();

    await db.collection('emails').insertOne({ email });
    await client.close();

    res.status(201).json({ message: 'Signed up!' });
  }
};
