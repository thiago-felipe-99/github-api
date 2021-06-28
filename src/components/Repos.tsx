import { useRef } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useUserRepos from "../hooks/useUserRepos";
import Repo from "./Repo";

interface Props { username: string }

export default function Repos(props: Props): JSX.Element {
  const {
    repos, error, isLoading, hasNextPage, fetchNextPage
  } = useUserRepos(props.username);
  const fetchNextPageButtonRef = useRef(null);

  useIntersectionObserver({
    target:      fetchNextPageButtonRef,
    onIntersect: fetchNextPage,
    enabled:     hasNextPage,
    threshold:   0,
    rootMargin:  "100%"
  });

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
      {repos.map((repo) => <Repo key={repo.id} repo={repo}/>)}
      {isLoading
        ? <p>Carregando reposítórios</p>
        : !repos.length && <p>Nenhum Repositório Encontrado</p>}
      <button
        ref={fetchNextPageButtonRef}
        onClick={() => fetchNextPage()}
        disabled={isLoading || !hasNextPage}
      >
        {hasNextPage ? "Carregar Mais" : "Nada Mais Para Carregar"}
      </button>
    </section>
  );
}
