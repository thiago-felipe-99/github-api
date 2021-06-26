import { useUsersStates } from "../contexts/Users";
import User from "./User";

export default function Users(): JSX.Element {
  const { users, error, isLoading } = useUsersStates();

  if (error)
    return (
      <section>
        Não Foi Possível Mostrar Os Usuários
      </section>
    );

  return (
    <section>
      {isLoading
        ? <p>Carregando Usuários</p>
        : !users.length && <p>Não Foi Encontrado Nenhum Usuário</p>}
      {users.map((user) => <User key={user.id} user={user}/>)}
    </section>
  );
}
