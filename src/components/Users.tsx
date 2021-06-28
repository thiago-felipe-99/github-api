import { useRef } from "react";
import { useUsersFetchers, useUsersStates } from "../contexts/Users";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import User from "./User";

export default function Users(): JSX.Element {
  const {
    users, error, isLoading, hasNextPage
  } = useUsersStates();
  const fetchers = useUsersFetchers();
  const fetchNextPageButtonRef = useRef(null);

  useIntersectionObserver({
    target:      fetchNextPageButtonRef,
    onIntersect: fetchers?.fetchNextUsers,
    enabled:     hasNextPage,
    threshold:   0,
    rootMargin:  "100%"
  });

  if (error)
    return (
      <section>
        Não Foi Possível Mostrar Os Usuários
      </section>
    );

  return (
    <section>
      {users.map((user) => <User key={user.id} user={user}/>)}
      {isLoading
        ? <p>Carregando Usuários</p>
        : !users.length && <p>Não Foi Encontrado Nenhum Usuário</p>}
      <button
        ref={fetchNextPageButtonRef}
        onClick={() => fetchers?.fetchNextUsers()}
        disabled={isLoading || !hasNextPage}
      >
        {hasNextPage ? "Carregar Mais" : "Nada Mais Para Carregar"}
      </button>
    </section>
  );
}
