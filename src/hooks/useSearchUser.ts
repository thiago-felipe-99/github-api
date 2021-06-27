import { QueryObserverResult, useQuery } from "react-query";
import useApi, { User } from "./useApi";

export interface ReturnUseSearchUser {
  users: User[],
  refetch: ()=> Promise<QueryObserverResult<User[]>>,
  isLoading: boolean,
  error?: unknown
}

export default function useSearchUser(search: string): ReturnUseSearchUser {
  const { searchUser } = useApi();
  const {
    data = [],
    refetch,
    error,
    isFetching
  } = useQuery(
    [ "users", search ],
    () => {
      if (!search)
        return [];

      return searchUser(search).then((response) => response.data.items);
    }
  );

  return {
    users:     data,
    refetch,
    isLoading: isFetching,
    error
  };
}
