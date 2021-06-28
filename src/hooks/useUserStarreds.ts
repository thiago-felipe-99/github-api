import { InfiniteData, QueryObserverResult, useInfiniteQuery } from "react-query";
import useApi, { RepoResponse, StarredResponse } from "./useApi";

interface Return {
  starreds: RepoResponse["data"],
  fetchNextPage:
    () => Promise<QueryObserverResult<InfiniteData<StarredResponse|null>>>,
  hasNextPage?: boolean,
  isLoading: boolean,
  error?: any /*eslint-disable-line @typescript-eslint/no-explicit-any*/
}

export default function useUserStarreds(username: string): Return {
  const { userStarreds } = useApi();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    error,
    isFetching
  } = useInfiniteQuery(
    [ "starreds", username ],
    async ({ pageParam }) => {
      if (!username)
        return null;

      return userStarreds(username, pageParam).then((response) => response);
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
    starreds: data?.pages
      .flatMap((page) => page?.data || []) as RepoResponse["data"] || [],
    fetchNextPage,
    hasNextPage,
    isLoading: isFetching,
    error
  };
}

