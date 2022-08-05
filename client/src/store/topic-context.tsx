import React, { useCallback, useReducer } from "react";
import usePrivateAxios from "../hooks/usePrivateAccessTokenAxios";
import { getAll, getById, patch, remove, save } from "../api/genericApi";

import TopicClass from "../models/TopicClass";

type State = {
  error?: string;
  opStatus: "Finished" | "Pending" | "Failure" | null;
  topics: TopicClass[];
};

type TopicContextData = {
  saveTopic: (data: FormData) => void;
  fetchAll: () => void;
  fetchById: (id: number) => void;
  modifyTopic: (
    id: number,
    data: FormData,
    fetchSingleResult?: boolean
  ) => void;
  deleteTopic: (id: number) => void;
  data: State;
};

type Action =
  | { type: "request" }
  | { type: "success"; response: TopicClass[] }
  | { type: "failure"; error: any };

function topicReducer(state: State, action: Action): State {
  switch (action.type) {
    case "request":
      return { opStatus: "Pending", topics: [] };
    case "success":
      return { opStatus: "Finished", topics: action.response };
    case "failure":
      let msg =
        action.error instanceof Error
          ? action.error.message
          : "Something went wrong!";
      return { error: msg, opStatus: "Failure", topics: [] };
    default:
      return state;
  }
}

const TopicContext = React.createContext<TopicContextData>({
  saveTopic: () => {},
  fetchAll: () => {},
  fetchById: () => {},
  modifyTopic: () => {},
  deleteTopic: () => {},
  data: { opStatus: "Pending", topics: [] },
});

export const TopicContextProvider: React.FC = (props) => {
  const [httpState, dispatch] = useReducer(topicReducer, {
    opStatus: "Pending",
    topics: [],
  });

  const privateAxios = usePrivateAxios("/topics");

  const findAllTopics = useCallback(async () => {
    return getAll<TopicClass>(privateAxios);
  }, [privateAxios]);

  const fetchHandler = useCallback(async () => {
    dispatch({ type: "request" });
    try {
      const topics = await findAllTopics();
      dispatch({ type: "success", response: topics });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  }, []);

  const fetchById = useCallback(async (id: number) => {
    dispatch({ type: "request" });
    try {
      const topic = await getById<TopicClass>(privateAxios, id);
      dispatch({ type: "success", response: [topic] });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  }, []);

  const removeTopicHandler = async (id: number) => {
    dispatch({ type: "request" });
    try {
      await remove<TopicClass>(privateAxios, id);
      const topics = await findAllTopics();
      dispatch({ type: "success", response: topics });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  };

  const modifyTopicHandler = async (
    id: number,
    body: FormData,
    fetchSingleResult?: boolean
  ) => {
    dispatch({ type: "request" });
    try {
      await patch<FormData>(privateAxios, id, body);
      let topics;
      if (fetchSingleResult) {
        topics = [await getById<TopicClass>(privateAxios, id)];
      } else {
        topics = await findAllTopics();
      }
      dispatch({ type: "success", response: topics });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  };

  const addTopicHandler = async (data: FormData) => {
    dispatch({ type: "request" });
    try {
      await save<FormData>(privateAxios, data);
      const topics = await findAllTopics();
      dispatch({ type: "success", response: topics });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  };

  return (
    <TopicContext.Provider
      value={{
        modifyTopic: modifyTopicHandler,
        fetchAll: fetchHandler,
        fetchById: fetchById,
        deleteTopic: removeTopicHandler,
        saveTopic: addTopicHandler,
        data: httpState,
      }}
    >
      {props.children}
    </TopicContext.Provider>
  );
};

export default TopicContext;
