import { QueryObserverResult, useQuery } from "react-query";
import useApi, { UserInfo } from "./useApi";

interface Return {
  userInfo: UserInfo,
  refetch: ()=> Promise<QueryObserverResult<UserInfo>>,
  isLoading: boolean,
  error?: any /*eslint-disable-line @typescript-eslint/no-explicit-any*/
}

export default function useUserInfo(username = ""): Return {
  const { userInfo } = useApi();
  const {
    data = {},
    refetch,
    error,
    isFetching
  } = useQuery(
    [ "userInfo", username ],
    () => userInfo(username).then((response) => response.data)
  );

  return {
    userInfo:  data,
    refetch,
    isLoading: isFetching,
    error
  };
}

