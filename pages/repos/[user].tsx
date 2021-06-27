import { useRouter } from "next/dist/client/router";
import Repos from "../../src/components/Repos";

export default function Repo(): JSX.Element {
  const { query: { user } } = useRouter();

  return (
    <main>
      <Repos username={user as string}/>
    </main>
  );
}
