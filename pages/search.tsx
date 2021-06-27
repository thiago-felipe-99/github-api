import SearchUsers from "../src/components/SearchUsers";
import UsersContext from "../src/contexts/Users";
import Users from "../src/components/Users";
import Header from "../src/components/Header";

export default function UsersPage(): JSX.Element {
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
