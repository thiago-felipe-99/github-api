import { useRouter } from "next/dist/client/router";
import Starreds from "../../src/components/Starreds";

export default function Starred(): JSX.Element {
  const { query: { user } } = useRouter();

  return (
    <main>
      <Starreds username={user as string}/>
    </main>
  );
}
