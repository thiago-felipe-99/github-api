import { RepoResponse } from "../hooks/useApi";

interface Props { repo: RepoResponse["data"][number] }

export default function Repo(props: Props): JSX.Element {
  const {
    name,
    description,
    fork,
    forks_count: forksCount,
    topics,
    license,
    owner,
    full_name: fullName,
    archived,
    disabled,
    homepage,
    language,
    watchers_count: watchersCount,
    stargazers_count: stargazersCount
  } = props.repo;

  return (
    <article>
      <h3>{name}</h3>
      <h4>{owner?.login || "Proprietário Não Definido"}</h4>
      <h4>{fullName}</h4>
      <p>{language || "Linguagem Não Definida"}</p>
      <p>{description || "Descrição Não Fornecida"}</p>
      <div>
        {topics?.map((topic) => <p key={topic}>{topic}</p>)}
        {(!topics || !topics.length) && <p>Tópicos Não Definidos</p>}
      </div>
      <p>{`Arquivado: ${archived ? "Sim" : "Não"}`}</p>
      <p>{`Desativado: ${disabled ? "Sim" : "Não"}`}</p>
      <a href={homepage || ""} target="_blank" rel="noreferrer">
        <button disabled={!homepage}>Página</button>
      </a>
      <p>{`É Um fork: ${fork ? "sim" : "não"}`}</p>
      <p>{`Estrelas: ${stargazersCount || 0}`}</p>
      <p>{`Forks: ${forksCount || 0}`}</p>
      <p>{`Vizualizações: ${watchersCount || 0}`}</p>
      <p>{license?.name || "Licensa Não Definida"}</p>
    </article>
  );
}
