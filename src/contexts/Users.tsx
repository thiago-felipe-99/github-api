import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";
import useSearchUser, { ReturnUseSearchUser } from "../hooks/useSearchUser";

interface Props {
  children: ReactNode
}

interface Context {
  states: Omit<ReturnUseSearchUser, "refetch" | "fetchNextPage"> & {
    search: string,
  },
  fetchers?: {
    fetchNextUsers: ReturnUseSearchUser["fetchNextPage"],
  },
  setters?: {
    search: Dispatch<SetStateAction<string>>
  }
}

const defaultValue: Context = {
  states: {
    search:    "",
    isLoading: false,
    users:     []
  }
};

const Context = createContext<Context>(defaultValue);

export default function UsersContext(props: Props): JSX.Element {
  const [ search, setSearch ] = useState("");
  const {
    users, error, isLoading, hasNextPage, fetchNextPage: fetchNextUsers
  } = useSearchUser(search);

  const states: Context["states"] = {
    search,
    users,
    isLoading,
    hasNextPage,
    error
  };

  const fetchers: Context["fetchers"] = { fetchNextUsers };

  const setters: Context["setters"] = { search: setSearch };

  return (
    <Context.Provider
      value={{
        states,
        fetchers,
        setters
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export function useUsers(): Context {
  return useContext(Context);
}

export function useUsersStates(): Context["states"] {
  return useUsers().states;
}

export function useUsersFetchers(): Context["fetchers"] {
  return useUsers().fetchers;
}

export function useUsersSetters(): Context["setters"] {
  return useUsers().setters;
}
