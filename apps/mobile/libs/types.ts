export type Post = {
  id: number,
  createdAt: Date,
  text: string
}

export type CreatePost = {
  id?: number,
  createdAt?: Date,
  text: string
}