/*eslint-disable-next-line max-len*/
const githubURL = `${process.env.NEXT_PUBLIC_GITHUB_LOGIN}/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;

export default function Login(): JSX.Element {
  return (
    <main>
      <a href={githubURL}>
        <button>
          Login Com GitHub
        </button>
      </a>
    </main>
  );
}
