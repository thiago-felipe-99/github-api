import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
import axios from "axios";

export type User =
  Exclude<Endpoints["GET /search/users"]["response"]["data"]["items"][number], null>;

export type UserInfo = Endpoints["GET /users/{username}"]["response"]["data"];

export type Repo =
  Endpoints["GET /users/{username}/repos"]["response"]["data"][number];

export type Starred = Repo;

export async function setToken(code: string): Promise<void> {
  const body = { code };
  const { data: { token } } = await axios.post(`/api/token?code=${code}`, body);
  localStorage.setItem("token", token);
}

export function getToken(): string {
  return localStorage.getItem("token") || "";
}

function getOctokit(): Octokit  {
  return new Octokit({ auth: getToken() });
}

export function userInfo(username?: string)
: Promise<Endpoints["GET /users/{username}"]["response"]> {
  if (!username)
    return getOctokit().request("GET /user");

  return getOctokit().request("GET /users/{username}", { username });
}

export function searchUser(search: string)
: Promise<Endpoints["GET /search/users"]["response"]> {
  return getOctokit().request("GET /search/users", { q: search });
}

export function userRepos(username: string)
: Promise<Endpoints["GET /users/{username}/repos"]["response"]> {
  return getOctokit().request("GET /users/{username}/repos", {
    username,
    type: "all"
  });
}

export function userStarreds(username: string)
: Promise<Endpoints["GET /users/{username}/starred"]["response"]> {
  return getOctokit().request("GET /users/{username}/starred", { username });
}

