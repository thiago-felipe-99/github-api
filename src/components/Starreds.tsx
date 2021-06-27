import useUserStarreds from "../hooks/useUserStarreds";
import Repo from "./Repo";

interface Props { username: string }

export default function Starreds(props: Props): JSX.Element {
  const { starreds, error, isLoading } = useUserStarreds(props.username);

  if (error?.response?.data?.message === "Not Found")
    return (
      <section>
        Usuário Não encontrado
      </section>
    );

  if (error)
    return (
      <section>
        Não Foi Possível Pegar Os Reposítorios
      </section>
    );

  return (
    <section>
      {isLoading
        ? <p>Carregando reposítórios</p>
        : !starreds.length && <p>Nenhum Repositório foi Favoritado</p>}
      {starreds.map((repo) => <Repo key={repo.id} repo={repo}/>)}
    </section>
  );
}

