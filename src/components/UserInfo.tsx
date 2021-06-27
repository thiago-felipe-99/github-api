import useUserInfo from "../hooks/useUserInfo";
import UserInfoCard from "./UserInfoCard";

interface Props {
  username?: string
}

export default function UserInfo(props: Props): JSX.Element {
  const { userInfo, error, isLoading } = useUserInfo(props.username);

  if (error?.response?.data?.message === "Not Found")
    return (
      <section>
        Usuário Não encontrado
      </section>
    );

  if (error)
    return (
      <section>
        Não Foi Possível Pegar Os Reposotórios
      </section>
    );

  return (
    <section>
      {isLoading ? <p>Carregando Usuário</p> : <UserInfoCard user={userInfo}/>}
    </section>
  );
}
