import type { Response } from "./base";
import { authedHttp } from "./http";

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface PostPayload {
  title: string;
  body: string;
}

export function getPosts(page = 1, perPage = 10) {
  return authedHttp
    .get<Response<Post[]>>(`https://gorest.co.in/public/v1/posts`, {
      params: {
        page,
        per_page: perPage,
      },
    })
    .then((res) => res.data);
}

export function getPostsByUserId(userId: number, page = 1, perPage = 10) {
  return authedHttp
    .get<Response<Post[]>>(
      `https://gorest.co.in/public/v1/users/${userId}/posts`,
      {
        params: {
          page,
          per_page: perPage,
        },
      },
    )
    .then((res) => res.data);
}

export function getPostById(id: number) {
  return authedHttp
    .get<Response<Post>>(`https://gorest.co.in/public/v1/posts/${id}`)
    .then((res) => res.data);
}

export function createPost(payload: PostPayload) {
  const profile = JSON.parse(localStorage.getItem("profile") ?? "");

  return authedHttp
    .post<Response<Post>>(`https://gorest.co.in/public/v1/posts`, {
      ...payload,
      user_id: profile?.id,
      user: profile?.name,
    })
    .then((res) => res.data);
}

export function updatePost(id: number, payload: PostPayload) {
  const profile = JSON.parse(localStorage.getItem("profile") ?? "");

  return authedHttp
    .patch<Response<Post>>(`https://gorest.co.in/public/v1/posts/${id}`, {
      ...payload,
      user_id: profile?.id,
      user: profile?.name,
    })
    .then((res) => res.data);
}

export function deletePost(id: number) {
  return authedHttp
    .delete<Response<Post>>(`https://gorest.co.in/public/v1/posts/${id}`)
    .then((res) => res.data);
}
