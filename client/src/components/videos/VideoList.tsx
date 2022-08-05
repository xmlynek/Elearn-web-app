import { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import VideoClass from "../../models/VideoClass";

import VideoContext from "../../store/video-context";
import Video from "./Video";

type Props = {
  videos: VideoClass[];
};

const VideoList: React.FC<Props> = (props) => {
  const videoCtx = useContext(VideoContext);

  return (
    <ListGroup>
      {props.videos!.map((video) => (
        <Video
          key={video.id}
          video={video}
          onModify={videoCtx.modifyVideo.bind(null, video.id)}
          onDelete={videoCtx.removeVideo.bind(null, video.id)}
        />
      ))}
    </ListGroup>
  );
};

export default VideoList;
