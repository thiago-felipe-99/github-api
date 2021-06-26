import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";
import useSearchUser from "../hooks/useSearchUser";

interface Props {
  children: ReactNode
}

interface Context {
  states: {
    search: string
  },
  getters?: {
    getUsers: () => Promise<void>
  },
  setters?: {
    setSearch: Dispatch<SetStateAction<string>>
  }
}

const defaultValue: Context = { states: { search: "" } };

const Context = createContext<Context>(defaultValue);

export default function UsersContext(props: Props): JSX.Element {
  const [ search, setSearch ] = useState("");
  const { users, error, getUsers } = useSearchUser(search);

  const states = {
    search,
    users,
    error
  };

  const getters = { getUsers };

  const setters = { setSearch };

  return (
    <Context.Provider
      value={{
        states,
        getters,
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

export function useUsersGetters(): Context["getters"] {
  return useUsers().getters;
}

export function useUsersSetters(): Context["setters"] {
  return useUsers().setters;
}
