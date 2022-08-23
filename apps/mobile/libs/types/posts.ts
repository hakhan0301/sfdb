export type PostType =
  'TEXT' | 'LINK' | 'MEDIA';


export interface Post {
  id: string;
  post_type: PostType;
  created_at: string;
  title: string;
  body: string;
  user_id: string;
  likes: { user_id: string }[];
  likedByUser: [{ user_id: string }] | [];
  comments: {
    created_at: string;
    id: string;
    body: string;
    user: {
      username: string;
      pfp: string;
    };
  }[];
  user: User;
}

export interface User {
  id: string;
  username: string;
  pfp: string;
}

export interface Like {
  post_id: string;
  user_id: string;
}


export interface DBComment {
  id: string,
  created_at: Date,
  post_id: string,
  user_id: string,
  body: string,
}


export interface BasePostBody {
  title: string;
}

export interface TextBody extends BasePostBody {
  content: string;
}

export interface LinkBody extends BasePostBody {
  link: string;
}


export type FileType = "Image" | 'Video' | 'File';

export const fileMimes: { [K in FileType]: string } = {
  Image: 'image/*',
  Video: 'video/*',
  File: '*/*'
}

export interface FileBody extends BasePostBody {
  url: string;
  fileType: FileType
}

export type PostBody = TextBody | LinkBody | FileBody;

// ----------------------- dummy types --------------

export interface _Post {
  id: string;
  post_type: PostType;
  likedByUser: boolean;
  createdAt: Date;
  title: string;
  text: string;
  likes: number;
  user: _User;
  comments: Comment[];
}

export interface _User {
  name: string;
  pfp: string;
  streaks: number;
  strikes: number;
}

export interface Comment {
  id: string,
  text: string,
  createdAt: Date,
  user: {
    name: string,
    pfp: string
  },
}

