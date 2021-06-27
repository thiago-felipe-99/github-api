import { signIn } from "next-auth/client";

export default function Login(): JSX.Element {
  return (
    <main>
      <button onClick={() => signIn("github", { callbackUrl: "/" })}>
        Entrar com Github
      </button>
    </main>
  );
}
