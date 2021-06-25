import axios from "axios";

export async function setToken(code: string): Promise<void> {
  const body = { code };
  const { data } = await axios.post(`/api/token?code=${code}`, body);
  localStorage.setItem("token", data.token);
}

