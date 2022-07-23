export type PostType =
  'TEXT' | 'LINK' | 'MEDIA';

export interface _Post {
  id: number;
  post_type: PostType;
  createdAt: Date;
  title: string;
  text: string;
  likes: number;
  user: User;
  comments: Comment[];
}


export interface Post {
  id: number;
  post_type: PostType;
  created_at: string;
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