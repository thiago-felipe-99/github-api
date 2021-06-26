import { QueryObserverResult, useQuery } from "react-query";
import { searchUser, User } from "../api";

export interface ReturnUserSearchUser {
  users: User[],
  refetch: ()=> Promise<QueryObserverResult<User[]>>,
  isLoading: boolean,
  error?: unknown
}

export default function useSearchUser(search: string): ReturnUserSearchUser {
  const {
    data = [],
    refetch,
    error,
    isLoading
  } = useQuery(
    [ "users", search ],
    () => {
      if (!search)
        return [];

      return searchUser(search).then((response) => response.data.items);
    }
  );

  return {
    users: data,
    refetch,
    isLoading,
    error
  };
}
