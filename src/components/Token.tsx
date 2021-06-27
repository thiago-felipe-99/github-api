import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { setToken } from "../api";

export default function Token(): JSX.Element {
  const route = useRouter();
  const { code } = route.query;

  useEffect(() => {
    if (code)
      setToken(code as string)
        .then(() => route.push("/user"))
        .catch(() => {
          alert("Não Foi Possível Fazer Login, Irémos Voltar Para A Página Inicial");
          route.push("/");
        });
  }, [ code, route ]);

  return (
    <main>
      <p>Fazendo Login</p>
    </main>
  );
}
