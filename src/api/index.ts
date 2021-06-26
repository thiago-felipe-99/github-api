import { Octokit } from "@octokit/core";
import { Endpoints } from "@octokit/types";
import axios from "axios";

export type User = Endpoints["GET /user"]["response"]["data"];

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

export async function searchUser(search: string)
: Promise<Endpoints["GET /search/users"]["response"]> {
  return getOctokit().request("GET /search/users", { q: search });
}
