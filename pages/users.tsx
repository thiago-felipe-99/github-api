import SearchUsers from "../src/components/SearchUsers";
import UsersContext from "../src/contexts/Users";

export default function Users(): JSX.Element {
  return (
    <>
      <UsersContext>
        <SearchUsers/>
      </UsersContext>
    </>
  );
}
