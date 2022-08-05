import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import VideoList from "../components/videos/VideoList";
import NewVideoForm from "../components/videos/VideoForm";
import VideoContext from "../store/video-context";
import ProtectedComponent from "../components/UI/ProtectedComponent";
import { UserRole } from "../models/User";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ContainerWrapper from "../components/Layout/ContainerWrapper";
import ModalLayout from "../components/Layout/ModalLayout";

const VideoListPage: React.FC = () => {
  const videoCtx = useContext(VideoContext);

  const { error, opStatus: status, videos } = videoCtx.data;
  const fetchAll = videoCtx.fetchVideos;

  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  let output;

  const modalFormButton = (
    <ProtectedComponent requiredRole={[UserRole.ADMIN, UserRole.TEACHER]}>
      <div className="centered">
        <Button onClick={() => setIsShown(true)}>Vytvoriť nové video</Button>
        <ModalLayout
          title={"Vytvorenie nového videa"}
          backdropType={"static"}
          show={isShown}
          onHide={() => setIsShown(false)}
        >
          <NewVideoForm
            submitBtnText="Vytvoriť video"
            onSubmit={(data) => {
              videoCtx.addVideo(data);
              setIsShown(false);
            }}
          />
        </ModalLayout>
      </div>
    </ProtectedComponent>
  );

  if (status === "Pending") {
    output = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || status === "Failure") {
    output = <p className="centered h4 error-msg">{error}</p>;
  }

  if (status === "Finished" && (!videos || videos.length === 0)) {
    output = (
      <>
        <div className="centered">
          <p className="h4">Žiadne videá neboli nájdené</p>
        </div>
      </>
    );
  }

  if (status === "Finished" && !error && videos && videos.length > 0) {
    output = (
      <>
        <div className="maxwidth-720">
          <VideoList videos={videos} />
        </div>
      </>
    );
  }

  return (
    <ContainerWrapper>
      <Row>
        <Col>
          <div className="centered">
            <h2 className="display-2 txt-main">Zoznam Videí</h2>
          </div>
          {modalFormButton}
        </Col>
      </Row>
      <Row>
        <Col>{output}</Col>
      </Row>
    </ContainerWrapper>
  );
};

export default VideoListPage;
