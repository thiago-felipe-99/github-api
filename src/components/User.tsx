import Link from "next/link";
import { User as UserInterface } from "../api";

interface Props {
  user: UserInterface
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
        <button>Starred</button>
      </div>
    </article>
  );
}
