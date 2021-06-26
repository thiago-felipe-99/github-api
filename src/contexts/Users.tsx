import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";

interface Props {
  children: ReactNode
}

interface Context {
  states: {
    search: string
  },
  setters: {
    setSearch: Dispatch<SetStateAction<string>> | null
  }
}

const defaultValue: Context = {
  states:  { search: "" },
  setters: { setSearch: null }
};

const Context = createContext<Context>(defaultValue);

export default function UsersContext(props: Props): JSX.Element {
  const [ search, setSearch ] = useState("");

  const states = { search };

  const setters = { setSearch };

  return (
    <Context.Provider
      value={{
        states,
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

export function useUsersSetters(): Context["setters"] {
  return useUsers().setters;
}
