import Link from "next/link";
import { UserInfo } from "../hooks/useApi";

interface Props {
  user: UserInfo
}

export default function UserInfoCard(props: Props): JSX.Element {
  const {
    avatar_url: avatarUrl,
    login,
    name,
    bio,
    created_at: createdAt,
    followers,
    following,
    twitter_username: twitterUsername,
    blog,
    email,
    company,
    hireable,
    location,
    total_private_repos: totalPrivateRepos,
    public_repos: publicRepos,
    public_gists: publicGists
  } = props.user;

  return (
    <article>
      <img src={avatarUrl} alt={login}/>
      <h3>{login}</h3>
      <h4>{name || "Nome Não Informado"}</h4>
      <p>{bio || "Bio Não Informada"}</p>
      <p>{`Entrou em ${new Date(createdAt).toLocaleString()}`}</p>
      <p>{`Seguidores: ${followers || 0}`}</p>
      <p>{`Seguindo: ${following || 0}`}</p>
      <p>{`Twitter: ${twitterUsername || "Twitter Não Informado"}`}</p>
      <a href={blog} target="_blank" rel="noreferrer">
        <button disabled={!blog}>Ir Para Blog</button>
      </a>
      <p>{`Email: ${email || "Email Não Informado"}`}</p>
      <p>{`Empresa: ${company || "Compania Não Informada"}`}</p>
      <p>{`Contratável: ${hireable ? "Sim" : "Não"}`}</p>
      <p>{`Local: ${location || "Local Não Informado"}`}</p>
      <p>{`Repositórios Privados: ${totalPrivateRepos || 0}`}</p>
      <p>{`Repositórios Públicos: ${publicRepos || 0}`}</p>
      <p>{`Repositórios Gists: ${publicGists || 0}`}</p>
      <Link href={`/repos/${login}`}>
        <a>
          <button>Repositórios</button>
        </a>
      </Link>
      <Link href={`/starreds/${login}`}>
        <a>
          <button>Estrelas</button>
        </a>
      </Link>
    </article>
  );
}
