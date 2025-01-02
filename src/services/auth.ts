import type { Response } from "./base";
import { http } from "./http";
import type { User } from "./user";

export interface LoginPayload {
  name: string;
  token: string;
}

export interface LoginResponse {
  name: string;
  expired_at: string;
  token: string;
}

export function login({ name, token }: LoginPayload) {
  return http
    .post<Response<User>>(
      "/users",
      {
        name,
        gender: "male",
        email: `${name.split(" ").join(".")}@email.com`,
        status: "active",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((res) => {
      const expiredAt = new Date(
        new Date().getTime() + 30 * 60 * 1000,
      ).toISOString();

      localStorage.setItem("profile", JSON.stringify(res.data.data));
      localStorage.setItem("token", token);
      localStorage.setItem("expired_at", expiredAt);

      return res.data;
    });
}

export function logout() {
  localStorage.removeItem("profile");
  localStorage.removeItem("token");
  localStorage.removeItem("expired_at");

  window.location.replace("/login");
}

export function checkSession() {
  const token = localStorage.getItem("token");
  const expiredAtStr = localStorage.getItem("expired_at");

  if (!token || !expiredAtStr) {
    return false;
  }

  const expiretAt = new Date(expiredAtStr);

  if (isNaN(expiretAt.getTime()) || Date.now() >= expiretAt.getTime()) {
    return false;
  }

  return true;
}
