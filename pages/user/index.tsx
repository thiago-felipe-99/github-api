import UserInfo from "../../src/components/UserInfo";
import Header from "../../src/components/Header";

export default function User(): JSX.Element {
  return (
    <>
      <Header userPage={{ show: false }}/>
      <main>
        <UserInfo/>
      </main>
    </>
  );
}

