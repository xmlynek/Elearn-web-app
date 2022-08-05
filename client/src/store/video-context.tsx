import VideoClass from "../models/VideoClass";
import React, { useCallback, useReducer } from "react";

import usePrivateAxios from "../hooks/usePrivateAccessTokenAxios";
import { getAll, remove, save, update } from "../api/genericApi";

type State = {
  error?: string;
  opStatus: "Finished" | "Pending" | "Failure" | null;
  videos: VideoClass[];
};

type VideoContextData = {
  addVideo: (data: any) => void;
  fetchVideos: () => void;
  modifyVideo: (id: number, data: any) => void;
  removeVideo: (id: number) => void;
  data: State;
};

type Action =
  | { type: "request" }
  | { type: "success"; response: VideoClass[] }
  | { type: "failure"; error: any };

function videoReducer(state: State, action: Action): State {
  switch (action.type) {
    case "request":
      return { opStatus: "Pending", videos: [] };
    case "success":
      return { opStatus: "Finished", videos: action.response };
    case "failure":
      let msg =
        action.error instanceof Error
          ? action.error.message
          : "Something went wrong!";
      return { error: msg, opStatus: "Failure", videos: [] };
    default:
      return state;
  }
}

const VideoContext = React.createContext<VideoContextData>({
  addVideo: () => {},
  fetchVideos: () => {},
  modifyVideo: () => {},
  removeVideo: () => {},
  data: { opStatus: "Pending", videos: [] },
});

export const VideoContextProvider: React.FC = (props) => {
  const [httpState, dispatch] = useReducer(videoReducer, {
    opStatus: "Pending",
    videos: [],
  });

  const privateAxios = usePrivateAxios("/videos");

  const findAllVideos = useCallback(async () => {
    return getAll<VideoClass>(privateAxios);
  }, []);

  const fetchHandler = useCallback(async () => {
    dispatch({ type: "request" });
    try {
      const videos = await findAllVideos();
      dispatch({ type: "success", response: videos });
    } catch (err: any) {
      console.log(err?.response?.data?.message);
      dispatch({ type: "failure", error: err });
    }
  }, [findAllVideos]);

  const removeVideoHandler = async (id: number) => {
    dispatch({ type: "request" });
    try {
      await remove<VideoClass>(privateAxios, id);
      const videos = await findAllVideos();
      dispatch({ type: "success", response: videos });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  };

  const modifyVideoHandler = async (id: number, body: VideoClass) => {
    dispatch({ type: "request" });
    try {
      await update<VideoClass>(privateAxios, id, body);
      const videos = await findAllVideos();
      dispatch({ type: "success", response: videos });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  };

  const addVideoHandler = async (data: VideoClass) => {
    dispatch({ type: "request" });
    try {
      await save<VideoClass>(privateAxios, data);
      const videos = await findAllVideos();
      dispatch({ type: "success", response: videos });
    } catch (err) {
      dispatch({ type: "failure", error: err });
    }
  };

  return (
    <VideoContext.Provider
      value={{
        modifyVideo: modifyVideoHandler,
        fetchVideos: fetchHandler,
        removeVideo: removeVideoHandler,
        addVideo: addVideoHandler,
        data: httpState,
      }}
    >
      {props.children}
    </VideoContext.Provider>
  );
};

export default VideoContext;
