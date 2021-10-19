import type { NextApiRequest, NextApiResponse } from 'next';
import { checkIfEmailEmpty, checkIfStringEmpty } from 'helpers/validation';
import type { CommentWithId } from 'types';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { eventId } = req.query;

  if (req.method === 'GET') {
    const comments: CommentWithId[] = [
      { id: '1', email: '1@3.df', name: 'Vadim', text: 'hello' },
    ];
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

    const newComment: CommentWithId = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    res.status(201).json({
      message: 'Added comment.',
      comment: newComment,
    });
  }
};
