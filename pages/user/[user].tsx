import { useRouter } from "next/dist/client/router";
import UserInfo from "../../src/components/UserInfo";
import Header from "../../src/components/Header";
import { useSession } from "next-auth/client";

export default function User(): JSX.Element {
  const { query: { user } } = useRouter();
  const [ session ] = useSession();

  if (!session)
    return <></>;

  return (
    <>
      <Header/>
      <main>
        <UserInfo username={user as string}/>
      </main>
    </>
  );
}

export { getServerSideProps } from "../../src/services/getServerSideProps/notLogin";
