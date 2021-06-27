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
  states: Pick<ReturnUseSearchUser, "users" | "error" | "isLoading"> & {
    search: string,

  },
  refetch?: {
    users: ReturnUseSearchUser["refetch"]
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
    users, error, refetch: refetchUsers, isLoading
  } = useSearchUser(search);

  const states: Context["states"] = {
    search,
    users,
    isLoading,
    error
  };

  const refetch: Context["refetch"] = { users: refetchUsers };

  const setters: Context["setters"] = { search: setSearch };

  return (
    <Context.Provider
      value={{
        states,
        refetch,
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

export function useUsersGetters(): Context["setters"] {
  return useUsers().setters;
}

export function useUsersSetters(): Context["setters"] {
  return useUsers().setters;
}
