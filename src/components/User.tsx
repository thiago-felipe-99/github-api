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
        <button>Repositórios</button>
        <button>Starred</button>
      </div>
    </article>
  );
}
