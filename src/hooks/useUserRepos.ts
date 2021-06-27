import { QueryObserverResult, useQuery } from "react-query";
import useApi, { Repo } from "./useApi";

interface Return {
  repos: Repo[],
  refetch: ()=> Promise<QueryObserverResult<Repo[]>>,
  isLoading: boolean,
  error?: any /*eslint-disable-line @typescript-eslint/no-explicit-any*/
}

export default function useUserRepos(username: string): Return {
  const { userRepos } = useApi();
  const {
    data = [],
    refetch,
    error,
    isFetching
  } = useQuery(
    [ "repos", username ],
    () => {
      if (!username)
        return [];

      return userRepos(username).then((response) => response.data);
    }
  );

  return {
    repos:     data,
    refetch,
    isLoading: isFetching,
    error
  };
}
