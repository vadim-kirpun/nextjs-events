export interface Comment {
  email: string;
  name: string;
  text: string;
}

export interface CommentWithId extends Comment {
  id: string;
}
