import { QueryObserverResult, useQuery } from "react-query";
import useApi, { Starred } from "./useApi";

interface Return {
  starreds: Starred[],
  refetch: ()=> Promise<QueryObserverResult<Starred[]>>,
  isLoading: boolean,
  error?: any /*eslint-disable-line @typescript-eslint/no-explicit-any*/
}

export default function useUserStarreds(username: string): Return {
  const { userStarreds } = useApi();
  const {
    data,
    refetch,
    error,
    isFetching
  } = useQuery(
    [ "starreds", username ],
    async () => {
      if (!username)
        return [];

      return userStarreds(username).then((response) => response.data);
    }
  );

  return {
    starreds:  (data || []) as Starred[],
    refetch:   refetch as ()=> Promise<QueryObserverResult<Starred[]>>,
    isLoading: isFetching,
    error
  };
}

