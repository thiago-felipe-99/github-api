import useUserRepos from "../hooks/useUserRepos";
import Repo from "./Repo";

interface Props { username: string }

export default function Repos(props: Props): JSX.Element {
  const { repos, error, isLoading } = useUserRepos(props.username);

  if (error?.response.data.message === "Not Found")
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
      {isLoading && <p>Carregando reposítórios</p>}
      {repos.map((repo) => <Repo key={repo.id} repo={repo}/>)}
    </section>
  );
}
