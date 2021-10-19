import type { NextApiRequest, NextApiResponse } from 'next';
import { checkIfEmailEmpty, connectToDB } from 'helpers';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (checkIfEmailEmpty(email)) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const { client, db } = await connectToDB();
    await db.collection('emails').insertOne({ email });
    await client.close();

    res.status(201).json({ message: 'Signed up!' });
  }
};
