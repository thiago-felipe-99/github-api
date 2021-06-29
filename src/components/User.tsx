import Link from "next/link";
import { UserResponse } from "../hooks/useApi";

interface Props {
  user: UserResponse["data"]["items"][number]
}

export default function User(props: Props) : JSX.Element {
  const { login, avatar_url: avatar } = props.user;
  return (
    <article>
      <img src={avatar} alt={login}/>
      <h3>{login}</h3>
      <div>
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
        <Link href={`/user/${login}`}>
          <a>
            <button>Ver Mais</button>
          </a>
        </Link>
      </div>
    </article>
  );
}
