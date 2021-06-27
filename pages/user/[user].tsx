import { useRouter } from "next/dist/client/router";
import UserInfo from "../../src/components/UserInfo";

export default function User(): JSX.Element {
  const { query: { user } } = useRouter();

  return (
    <main>
      <UserInfo username={user as string}/>
    </main>
  );
}
