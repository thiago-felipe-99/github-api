import SearchUsers from "../src/components/SearchUsers";
import UsersContext from "../src/contexts/Users";
import Users from "../src/components/Users";
import Header from "../src/components/Header";
import { useSession } from "next-auth/client";

export default function UsersPage(): JSX.Element {
  const [ session ] = useSession();

  if (!session)
    return <></>;

  return (
    <>
      <Header search={{ show: false }}/>
      <UsersContext>
        <main>
          <SearchUsers/>
          <Users/>
        </main>
      </UsersContext>
    </>
  );
}

export { getServerSideProps } from "../src/services/getServerSideProps/notLogin";
