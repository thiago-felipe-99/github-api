import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
import { useSession } from "next-auth/client";

export type User =
  Exclude<Endpoints["GET /search/users"]["response"]["data"]["items"][number], null>;

export type UserInfo = Endpoints["GET /users/{username}"]["response"]["data"];

export type Repo =
  Endpoints["GET /users/{username}/repos"]["response"]["data"][number];

export type Starred = Repo;

interface Return {
  userInfo: (username: string) =>
    Promise<Endpoints["GET /users/{username}"]["response"]>

  searchUser: (search: string) =>
    Promise<Endpoints["GET /search/users"]["response"]>

  userRepos: (username: string)  =>
    Promise<Endpoints["GET /users/{username}/repos"]["response"]>

  userStarreds: (username: string) =>
    Promise<Endpoints["GET /users/{username}/starred"]["response"]>
}

export default function useApi(): Return {
  const [ session ] = useSession();
  const octokit = new Octokit({ auth: session?.accessToken || "" });

  function userInfo(username: string) {
    if (!username)
      return octokit.request("GET /user");

    return octokit.request("GET /users/{username}", { username });
  }

  function searchUser(search: string) {
    return octokit.request("GET /search/users", { q: search });
  }

  function userRepos(username: string) {
    return octokit.request("GET /users/{username}/repos", {
      username,
      type: "all"
    });
  }

  function userStarreds(username: string) {
    return octokit.request("GET /users/{username}/starred", { username });
  }

  return {
    userInfo,
    searchUser,
    userRepos,
    userStarreds
  };
}
