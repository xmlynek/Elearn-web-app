import { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import VideoList from '../components/videos/VideoList';
import VideoForm from '../components/videos/VideoForm';
import VideoContext from '../store/video-context';
import ProtectedComponent from '../components/UI/ProtectedComponent';
import { UserRole } from '../models/User';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ContainerWrapper from '../components/Layout/ContainerWrapper';
import ModalLayout from '../components/Layout/ModalLayout';
import useLangTranslation from '../hooks/useLangTranslation';

const VideoListPage: React.FC = () => {
  const videoCtx = useContext(VideoContext);
  const translations = useLangTranslation();

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
        <Button onClick={() => setIsShown(true)}>
          {translations?.createNewVideoTitle}
        </Button>
        <ModalLayout
          title={translations?.createNewVideoTitle}
          backdropType={'static'}
          show={isShown}
          onHide={() => setIsShown(false)}
        >
          <VideoForm
            submitBtnText={translations?.createVideoSubmitButtonTitle}
            onSubmit={(data) => {
              videoCtx.addVideo(data);
              setIsShown(false);
            }}
          />
        </ModalLayout>
      </div>
    </ProtectedComponent>
  );

  if (status === 'Pending') {
    output = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || status === 'Failure') {
    output = <p className="centered h4 error-msg">{error}</p>;
  }

  if (status === 'Finished' && (!videos || videos.length === 0)) {
    output = (
      <>
        <div className="centered">
          <p className="h4">{translations?.noVideosFound}</p>
        </div>
      </>
    );
  }

  if (status === 'Finished' && !error && videos && videos.length > 0) {
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
            <h2 className="display-2 txt-main">
              {translations?.videoListHeader}
            </h2>
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
