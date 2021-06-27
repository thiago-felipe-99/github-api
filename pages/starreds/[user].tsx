import { useRouter } from "next/dist/client/router";
import Starreds from "../../src/components/Starreds";
import Header from "../../src/components/Header";
import { useSession } from "next-auth/client";

export default function Starred(): JSX.Element {
  const { query: { user } } = useRouter();
  const [ session ] = useSession();

  if (!session)
    return <></>;

  return (
    <>
      <Header/>
      <main>
        <Starreds username={user as string}/>
      </main>
    </>
  );
}

export { getServerSideProps } from "../../src/services/getServerSideProps/notLogin";
