import SearchUsers from "../src/components/SearchUsers";
import UsersContext from "../src/contexts/Users";
import Users from "../src/components/Users";

export default function UsersPage(): JSX.Element {
  return (
    <>
      <UsersContext>
        <SearchUsers/>
        <Users/>
      </UsersContext>
    </>
  );
}
