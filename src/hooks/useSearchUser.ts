import { InfiniteData, QueryObserverResult, useInfiniteQuery } from "react-query";
import useApi, { UserResponse } from "./useApi";

export interface ReturnUseSearchUser {
  users: UserResponse["data"]["items"],
  isLoading: boolean,
  fetchNextPage:
    () => Promise<QueryObserverResult<InfiniteData<UserResponse|null>>>,
  hasNextPage?: boolean,
  error?: unknown
}

export default function useSearchUser(search: string): ReturnUseSearchUser {
  const { searchUser } = useApi();
  const {
    data,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(
    [ "users", search ],
    ({ pageParam }) => {
      if (!search)
        return null;

      return searchUser(search, pageParam).then((response) => response);
    },
    {
      getNextPageParam(last, all) {
        if (!last?.headers.link?.includes("rel=\"next\""))
          return false;

        return all.length + 1;
      }
    }
  );

  return {
    users:     data?.pages.flatMap((page) => page?.data.items || []) || [],
    isLoading: isFetching,
    fetchNextPage,
    hasNextPage,
    error
  };
}
