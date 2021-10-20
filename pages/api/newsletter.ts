import type { NextApiRequest, NextApiResponse } from 'next';
import type { MongoClient, Db } from 'mongodb';
import { checkIfEmailEmpty } from 'helpers';
import { connectToDB } from 'helpers/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (checkIfEmailEmpty(email)) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client: MongoClient, db: Db;

    try {
      ({ client, db } = await connectToDB());
    } catch (error) {
      res.status(500).json({ message: 'Connection to the database failed!' });
      return;
    }

    try {
      await db.collection('emails').insertOne({ email });
    } catch (error) {
      res.status(500).json({ message: 'Inserting document failed!' });
    } finally {
      await client.close();
    }

    res.status(201).json({ message: 'Signed up!' });
  }
};
