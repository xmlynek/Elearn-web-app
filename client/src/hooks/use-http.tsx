import React, { useCallback, useReducer } from "react";

// type Data = 
//     | TopicClass
//     | TopicClass[]
//     | TopicItemClass
//     | TopicItemClass[]
//     | VideoClass
//     | VideoClass[];


export interface State<T> {
  data: T | null;
  isLoading: boolean;
  status: "Pending" | "Finished" | "Failure" | null;
  error?: string;
};

type Action<T> =
  | { type: "request" }
  | { type: "success"; results: T }
  | { type: "failure"; error: any };

function httpReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "request":
      // TODO
      return { isLoading: true, data: null, status: 'Pending' };
    case "success":
      // TODO
      return { isLoading: false, data: action.results, status: "Finished" };
    case "failure":
      let msg = action.error instanceof Error ? action.error.message : "Something went wrong!";
      // TODO
      return { isLoading: false, error: msg, data: null, status: "Failure" };
      default:
        return state;
  }
}

function useHttp<T>() {
  const [httpState, dispatch] = useReducer<React.Reducer<State<T>, Action<T>>>(httpReducer, { isLoading: false, data: null, status: null });

  const sendRequest = useCallback(
    async function (requestFunction: Function, requestData?: any) {
      dispatch({ type: "request" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "success", results: responseData });
      } catch (e) {
        dispatch({ type: "failure", error: e });
      }
    },
    []
  );

  return {httpState, sendRequest};
}

export default useHttp;
