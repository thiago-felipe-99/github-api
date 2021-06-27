import { GetServerSidePropsResult, NextPageContext } from "next";
import { getSession } from "next-auth/client";

export async function getServerSideProps({ req }: NextPageContext)
: Promise<GetServerSidePropsResult<unknown>> {
  const session = await getSession({ req });

  if (!session)
    return {
      props:    {},
      redirect: {
        destination: "/login",
        permanent:   false
      }
    };

  return { props: {} };
}
