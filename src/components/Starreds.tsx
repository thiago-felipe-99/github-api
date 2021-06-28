import { useRef } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useUserStarreds from "../hooks/useUserStarreds";
import Repo from "./Repo";

interface Props { username: string }

export default function Starreds(props: Props): JSX.Element {
  const {
    starreds, error, isLoading, hasNextPage, fetchNextPage
  } = useUserStarreds(props.username);
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
      {starreds.map((repo) => <Repo key={repo.id} repo={repo}/>)}
      {isLoading
        ? <p>Carregando reposítórios</p>
        : !starreds.length && <p>Nenhum Repositório foi Favoritado</p>}
      <button
        onClick={() => fetchNextPage()}
        disabled={isLoading || !hasNextPage}
        ref={fetchNextPageButtonRef}
      >
        {hasNextPage ? "Carregar Mais" : "Nada Mais Para Carregar"}
      </button>
    </section>
  );
}

