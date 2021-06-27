import UserInfo from "../../src/components/UserInfo";
import Header from "../../src/components/Header";
import { useSession } from "next-auth/client";

export default function User(): JSX.Element {
  const [ session ] = useSession();
  if (!session)
    return <></>;

  return (
    <>
      <Header userPage={{ show: false }}/>
      <main>
        <UserInfo/>
      </main>
    </>
  );
}

export { getServerSideProps } from "../../src/services/getServerSideProps/notLogin";
