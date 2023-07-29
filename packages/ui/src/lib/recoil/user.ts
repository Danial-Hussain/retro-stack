import { useState, useEffect } from "react";
import { atom, useRecoilState } from "recoil";

export interface User {
  id?: string;
  token?: string;
}

const defaultUser: User = { id: undefined, token: undefined };

export const userAtom = atom<User>({
  key: "userState",
  default: defaultUser,
  effects: [
    ({ setSelf, trigger }) => {
      if (trigger === "get") {
        const value = localStorage.getItem("user");
        setSelf(value ? JSON.parse(value) : defaultUser);
      }
    },
    ({ onSet }) => {
      onSet((newUser) => {
        localStorage.setItem("user", JSON.stringify(newUser));
      });
    },
  ],
});

export const useUser = () => {
  const [isInitial, setIsInitial] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);

  const removeUser = () => setUser(defaultUser);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultUser : user, setUser, removeUser] as const;
};
