import { useCallback, useEffect, useState } from "react";
import { searchUser, User } from "../api";

interface Return {
  users: User[],
  getUsers: ()=> Promise<void>,
  error: unknown
}

export default function useSearchUser(search: string): Return {
  const [ users, setUsers ] = useState<User[]>([]);
  const [ error, setError ] = useState<unknown>();

  const getUsers = useCallback(async () => {
    if (!search)
      return;

    try {
      const response = await searchUser(search);
      setUsers(response.data.items);
    } catch (error) {
      setError(error);
    }
  }, [ search ]);

  useEffect(() => { getUsers(); }, [ getUsers ]);

  return {
    users,
    getUsers,
    error
  };
}
