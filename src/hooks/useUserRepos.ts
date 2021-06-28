import { QueryObserverResult, useInfiniteQuery, InfiniteData } from "react-query";
import useApi, { RepoResponse } from "./useApi";

interface Return {
  repos: RepoResponse["data"],
  fetchNextPage:
    () => Promise<QueryObserverResult<InfiniteData<RepoResponse|null>>>,
  hasNextPage?: boolean,
  isLoading: boolean,
  error?: any /*eslint-disable-line @typescript-eslint/no-explicit-any*/
}

export default function useUserRepos(username: string): Return {
  const { userRepos } = useApi();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    error,
    isFetching
  } = useInfiniteQuery(
    [ "repos", username ],
    ({ pageParam }) => {
      if (!username)
        return null;

      return userRepos(username, pageParam).then((response) => response);
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
    repos:     data?.pages.flatMap((page) => page?.data || []) || [],
    fetchNextPage,
    hasNextPage,
    isLoading: isFetching,
    error
  };
}
