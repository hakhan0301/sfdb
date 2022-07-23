export interface Post {
  id: number;
  createdAt: Date;
  title: string;
  text: string;
  likes: number;
  user: User;
  comments: Comment[];
}

export interface _Post {
  id: number;
  createdAt: Date;
  title: string;
  body: string;
  user_id: string;
}


export interface User {
  pfp: string;
  name: string;
  streaks: number;
  strikes: number;
}


export interface Comment {
  id: number,
  text: string,
  createdAt: Date,
  user: {
    name: string,
    pfp: string
  },
}

export interface BasePostBody {
  title: string;
}

export interface TextPostBody extends BasePostBody {
  content: string;
}

export type PostBody = TextPostBody; 