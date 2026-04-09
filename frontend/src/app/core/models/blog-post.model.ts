export interface BlogPostMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  categories: string[];
  tags: string[];
  readingTime: number;
  lang: string;
  path: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export interface PostsIndex {
  generatedAt: string;
  posts: BlogPostMeta[];
}
