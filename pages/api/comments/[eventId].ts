import type { NextApiRequest, NextApiResponse } from 'next';
import { checkIfEmailEmpty, checkIfStringEmpty } from 'helpers';
import type { Db, MongoClient } from 'mongodb';
import { connectToDB } from 'helpers/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventId } = req.query;

  let client: MongoClient;
  let db: Db;

  try {
    ({ client, db } = await connectToDB());
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const documents = await db
        .collection('comments')
        .find()
        .sort({ _id: -1 }) // sorting in descending order. So latest comment is the first one
        .toArray();

      const comments = documents.map((doc) => ({ ...doc, id: doc._id }));

      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' });
    }
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    const isEmailInvalid = checkIfEmailEmpty(email);
    const isNameInvalid = checkIfStringEmpty(name);
    const isCommentInvalid = checkIfStringEmpty(text);

    if (isEmailInvalid || isNameInvalid || isCommentInvalid) {
      res.status(422).json({ message: 'Invalid input.' });
    } else {
      const newComment = { email, name, text, eventId };

      try {
        const { insertedId } = await db
          .collection('comments')
          .insertOne(newComment);

        res.status(201).json({
          message: 'Added comment.',
          comment: {
            id: insertedId,
            ...newComment,
          },
        });
      } catch (error) {
        res.status(500).json({ message: 'Inserting document failed!' });
      }
    }
  }

  await client.close();
};
