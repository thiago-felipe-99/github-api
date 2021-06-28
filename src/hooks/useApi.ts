import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
import { useSession } from "next-auth/client";

export type UserResponse = Endpoints["GET /search/users"]["response"];

export type UserInfo = Endpoints["GET /users/{username}"]["response"]["data"];

export type RepoResponse = Endpoints["GET /users/{username}/repos"]["response"];

export type StarredResponse = Endpoints["GET /users/{username}/starred"]["response"];

interface Return {
  userInfo: (username: string) =>
    Promise<Endpoints["GET /users/{username}"]["response"]>

  searchUser: (search: string, page?: number) =>
    Promise<Endpoints["GET /search/users"]["response"]>

  userRepos: (username: string, page?: number)  =>
    Promise<Endpoints["GET /users/{username}/repos"]["response"]>

  userStarreds: (username: string, page?: number) =>
    Promise<Endpoints["GET /users/{username}/starred"]["response"]>
}

/*eslint-disable camelcase*/
export default function useApi(): Return {
  const [ session ] = useSession();
  const octokit = new Octokit({ auth: session?.accessToken || "" });

  function userInfo(username: string) {
    if (!username)
      return octokit.request("GET /user");

    return octokit.request("GET /users/{username}", { username });
  }

  function searchUser(search: string, page = 1) {
    return octokit.request("GET /search/users", {
      q:        search,
      page,
      per_page: 50
    });
  }

  function userRepos(username: string, page = 1) {
    return octokit.request("GET /users/{username}/repos", {
      username,
      type:     "all",
      page,
      per_page: 50
    });
  }

  function userStarreds(username: string, page = 1) {
    return octokit.request("GET /users/{username}/starred", {
      username,
      page,
      per_page: 50
    });
  }

  return {
    userInfo,
    searchUser,
    userRepos,
    userStarreds
  };
}
