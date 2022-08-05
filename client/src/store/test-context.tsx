import React, { useCallback, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { getAll, getById, remove, save, update } from "../api/genericApi";
import usePrivateAxios from "../hooks/usePrivateAccessTokenAxios";
import TestClass, {
  convertTestClassToRequest,
  TestEvaluateRequest,
  TestRequest,
} from "../models/TestClass";

type State = {
  error?: string;
  opStatus: "Finished" | "Pending" | "Failure" | null;
  tests: TestClass[];
};

type TestContextData = {
  saveTest: (data: TestClass) => void;
  fetchAll: () => void;
  fetchById: (id: number) => void;
  modifyTest: (
    id: number,
    data: TestClass,
    fetchSingleResult?: boolean
  ) => void;
  deleteTest: (id: number) => void;
  evaluateTest: (body: TestEvaluateRequest, testId: number) => void;
  data: State;
};

type Action =
  | { type: "request" }
  | { type: "success"; response: TestClass[] }
  | { type: "failure"; error: any };

function testReducer(state: State, action: Action): State {
  switch (action.type) {
    case "request":
      return { opStatus: "Pending", tests: [] };
    case "success":
      return { opStatus: "Finished", tests: action.response };
    case "failure":
      let msg =
        action.error instanceof Error
          ? action.error.message
          : "Something went wrong!";
      return { error: msg, opStatus: "Failure", tests: [] };
    default:
      return state;
  }
}

const TestContext = React.createContext<TestContextData>({
  saveTest: () => {},
  fetchAll: () => {},
  fetchById: () => {},
  modifyTest: () => {},
  deleteTest: () => {},
  evaluateTest: () => {},
  data: { opStatus: "Pending", tests: [] },
});

export const TestContextProvider: React.FC = (props) => {
  const [httpState, dispatch] = useReducer(testReducer, {
    opStatus: "Pending",
    tests: [],
  });

  const navigate = useNavigate();
  const privateAxios = usePrivateAxios("/tests");

  const findAllTests = useCallback(async () => {
    return getAll<TestClass>(privateAxios);
  }, [privateAxios]);

  const fetchHandler = useCallback(async () => {
    dispatch({ type: "request" });
    try {
      const tests = await findAllTests();
      dispatch({ type: "success", response: tests });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  }, []);

  const fetchById = useCallback(async (id: number) => {
    dispatch({ type: "request" });
    try {
      const test = await getById<TestClass>(privateAxios, id);
      dispatch({ type: "success", response: [test] });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  }, []);

  const removeTestHandler = async (id: number) => {
    dispatch({ type: "request" });
    try {
      await remove<TestClass>(privateAxios, id);
      const tests = await findAllTests();
      dispatch({ type: "success", response: tests });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  };

  const modifyTestHandler = async (
    id: number,
    body: TestClass,
    fetchSingleResult?: boolean
  ) => {
    dispatch({ type: "request" });
    try {
      await update<TestRequest>(
        privateAxios,
        id,
        convertTestClassToRequest(body)
      );
      let tests;
      if (fetchSingleResult) {
        tests = [await getById<TestClass>(privateAxios, id)];
      } else {
        tests = await findAllTests();
      }
      dispatch({ type: "success", response: tests });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  };

  const addTestHandler = async (data: TestClass) => {
    dispatch({ type: "request" });
    try {
      data.position =
        data.position !== -1 ? data.position : httpState.tests.length + 1;
      await save<TestRequest>(privateAxios, convertTestClassToRequest(data));
      const tests = await findAllTests();
      dispatch({ type: "success", response: tests });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  };

  const evaluteTestHandler = async (
    data: TestEvaluateRequest,
    testId: number
  ) => {
    dispatch({ type: "request" });
    await privateAxios
      .post(`/${testId}/evaluate`, data)
      .then((res) => {
        dispatch({ type: "success", response: [] });
        navigate(`users/${res.data?.userId}/tests/${res.data?.id}`);
      })
      .catch((err) => {
        dispatch({ type: "failure", error: err });
      });
  };

  return (
    <TestContext.Provider
      value={{
        modifyTest: modifyTestHandler,
        fetchAll: fetchHandler,
        fetchById: fetchById,
        deleteTest: removeTestHandler,
        saveTest: addTestHandler,
        evaluateTest: evaluteTestHandler,
        data: httpState,
      }}
    >
      {props.children}
    </TestContext.Provider>
  );
};

export default TestContext;
