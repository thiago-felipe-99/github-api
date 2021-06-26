import { useUsersStates } from "../contexts/Users";
import User from "./User";

export default function Users(): JSX.Element {
  const { users } = useUsersStates();

  return (
    <section>
      {users.map((user) => <User key={user.id} user={user}/>)}
    </section>
  );
}
