import { Post, Theme } from "../pages/api/posts/types";

export interface ThemeProps {
  onClick: (id: number) => void;
  selectedThemesIds: number[];
  themes: Theme[];
}

export interface PostCardProps {
  post: Post;
}
