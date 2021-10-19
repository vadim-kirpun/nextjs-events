import type { NextApiRequest, NextApiResponse } from 'next';
import { checkIfEmailEmpty, checkIfStringEmpty, connectToDB } from 'helpers';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventId } = req.query;

  const { client, db } = await connectToDB();

  if (req.method === 'GET') {
    const documents = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 }) // sorting in descending order. So latest comment is the first one
      .toArray();

    const comments = documents.map((doc) => ({ ...doc, id: doc._id }));

    res.status(200).json(comments);
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    const isEmailInvalid = checkIfEmailEmpty(email);
    const isNameInvalid = checkIfStringEmpty(name);
    const isCommentInvalid = checkIfStringEmpty(text);

    if (isEmailInvalid || isNameInvalid || isCommentInvalid) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newComment = { email, name, text, eventId };

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
  }

  await client.close();
};
