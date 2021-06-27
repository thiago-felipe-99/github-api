import { useRouter } from "next/dist/client/router";
import Header from "../../src/components/Header";
import Repos from "../../src/components/Repos";

export default function Repo(): JSX.Element {
  const { query: { user } } = useRouter();

  return (
    <>
      <Header/>
      <main>
        <Repos username={user as string}/>
      </main>
    </>
  );
}
