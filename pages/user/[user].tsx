import { useRouter } from "next/dist/client/router";
import UserInfo from "../../src/components/UserInfo";
import Header from "../../src/components/Header";

export default function User(): JSX.Element {
  const { query: { user } } = useRouter();

  return (
    <>
      <Header/>
      <main>
        <UserInfo username={user as string}/>
      </main>
    </>
  );
}
