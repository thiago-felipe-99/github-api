const githubBaseURL = `${process.env.NEXT_PUBLIC_GITHUB_LOGIN}/authorize`;
const clientId = `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`;
const redirect = `redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;
const scopes = "scope=repo:status,read:user,user:email";
const githubURL = `${githubBaseURL}?${clientId}&${scopes}&${redirect}`;

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
