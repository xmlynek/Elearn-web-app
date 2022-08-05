import React, { useCallback, useReducer } from "react";
import usePrivateAxios from "../hooks/usePrivateAccessTokenAxios";
import { getAll, getById, remove, save, update } from "../api/genericApi";

import User, { AdminCreateUserRequest, UserRequest } from "../models/User";

type State = {
  error?: string;
  opStatus: "Finished" | "Pending" | "Failure" | null;
  users: User[];
};

type UserContextData = {
  fetchAll: () => void;
  fetchById: (id: number) => void;
  save: (data: AdminCreateUserRequest) => void;
  updateUser: (
    id: number,
    body: UserRequest,
    refetchSingleResult?: boolean
  ) => void;
  deleteUser: (id: number) => void;
  data: State;
};

type Action =
  | { type: "request" }
  | { type: "success"; response: User[] }
  | { type: "failure"; error: any };

function userReducer(state: State, action: Action): State {
  switch (action.type) {
    case "request":
      return { opStatus: "Pending", users: [] };
    case "success":
      return { opStatus: "Finished", users: action.response };
    case "failure":
      let msg =
        action.error instanceof Error
          ? action.error.message
          : "Something went wrong!";
      return { error: msg, opStatus: "Failure", users: [] };
    default:
      return state;
  }
}

const UserContext = React.createContext<UserContextData>({
  fetchAll: () => {},
  fetchById: () => {},
  save: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  data: { opStatus: "Pending", users: [] },
});

export const UserContextProvider: React.FC = (props) => {
  const [httpState, dispatch] = useReducer(userReducer, {
    opStatus: "Pending",
    users: [],
  });

  const privateAxios = usePrivateAxios("/users");

  const findAllUsers = useCallback(async () => {
    return getAll<User>(privateAxios);
  }, [privateAxios]);

  const fetchHandler = useCallback(async () => {
    dispatch({ type: "request" });
    try {
      const users = await findAllUsers();
      dispatch({ type: "success", response: users });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  }, []);

  const fetchById = useCallback(async (id: number) => {
    dispatch({ type: "request" });
    try {
      const user = await getById<User>(privateAxios, id);
      dispatch({ type: "success", response: [user] });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  }, []);

  const createUserHandler = async (data: AdminCreateUserRequest) => {
    dispatch({ type: "request" });
    try {
      await save<AdminCreateUserRequest>(privateAxios, data);
      const users = await findAllUsers();
      dispatch({ type: "success", response: users });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  };

  const updateUserHandler = async (
    id: number,
    body: UserRequest,
    refetchSingleResult?: boolean
  ) => {
    dispatch({ type: "request" });
    try {
      await update<UserRequest>(privateAxios, id, body);
      let users;
      if (refetchSingleResult) {
        users = [await getById<User>(privateAxios, id)];
      } else {
        users = await findAllUsers();
      }
      dispatch({ type: "success", response: users });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  };

  const deleteUserHandler = async (id: number) => {
    dispatch({ type: "request" });
    try {
      await remove(privateAxios, id);
      const users = await findAllUsers();
      dispatch({ type: "success", response: users });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  };

  return (
    <UserContext.Provider
      value={{
        fetchAll: fetchHandler,
        fetchById: fetchById,
        save: createUserHandler,
        updateUser: updateUserHandler,
        deleteUser: deleteUserHandler,
        data: httpState,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
