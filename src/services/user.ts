import type { Response } from "./base";
import { authedHttp } from "./http";

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export function getUserById(id: number) {
  return authedHttp
    .get<Response<User>>(`https://gorest.co.in/public/v1/users/${id}`)
    .then((res) => res.data);
}

export function getUsersByIds(ids: number[]) {
  const promises = ids.map((id) => getUserById(id));

  return Promise.allSettled(promises).then((usersRes) =>
    usersRes.map((res) => {
      if (res.status === "fulfilled") return res.value.data;
      else return;
    }),
  );
}
