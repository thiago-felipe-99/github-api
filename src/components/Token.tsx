import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { setToken } from "../api";

export default function Token(): JSX.Element {
  const route = useRouter();
  const { code } = route.query;

  useEffect(() => {
    if (!code)
      return;

    try {
      setToken(code as string);
      route.push("/");
    } catch {
      alert("Não Foi Possível Fazer Login, Irémos Voltar Para A Página De Login");
      route.push("/login");
    }
  }, [ code, route ]);

  return (
    <main>
      <p>Fazendo Login</p>
    </main>
  );
}
