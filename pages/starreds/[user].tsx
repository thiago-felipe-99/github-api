import { useRouter } from "next/dist/client/router";
import Starreds from "../../src/components/Starreds";
import Header from "../../src/components/Header";

export default function Starred(): JSX.Element {
  const { query: { user } } = useRouter();

  return (
    <>
      <Header/>
      <main>
        <Starreds username={user as string}/>
      </main>
    </>
  );
}
