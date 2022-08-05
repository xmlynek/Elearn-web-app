import VideoClass from '../../models/VideoClass';
import { Accordion } from 'react-bootstrap';
import VideoForm from './VideoForm';
import ProtectedComponent from '../UI/ProtectedComponent';
import { UserRole } from '../../models/User';
import ConfirmDialogButton from '../UI/ConfirmDialogButton';
import UpdateModalFormButton from '../UI/UpdateModalFormButton';
import useLangTranslation from '../../hooks/useLangTranslation';

type Props = {
  className?: string;
  video: VideoClass;
  onModify: (body: VideoClass) => void;
  onDelete: () => void;
};

const Video: React.FC<Props> = (props) => {
  const translations = useLangTranslation();

  return (
    <Accordion>
      <Accordion.Item eventKey={`""${props.video.id}`}>
        <Accordion.Header>
          <p className="h5">
            {props.video.title} - {props.video.author} - {props.video.length}
            min
          </p>
        </Accordion.Header>
        <Accordion.Body>
          <div>
            <ProtectedComponent
              requiredRole={[UserRole.ADMIN, UserRole.TEACHER]}
            >
              <div className="d-flex flex-column d-md-block float-md-end">
                <UpdateModalFormButton
                  modalTitle={translations?.videoUpdateModalTitle}
                >
                  <VideoForm
                    submitBtnText={translations?.updateSubmitButtonLabel}
                    video={props.video}
                    onSubmit={(data: VideoClass) => props.onModify(data)}
                  />
                </UpdateModalFormButton>
                <ConfirmDialogButton
                  confirmBtnTitle={translations?.deleteLabel}
                  className="mb-2 mt-2 mb-md-0 mt-md-0"
                  title={translations?.deleteVideoModalTitle}
                  bodyMessage={translations?.deleteVideoModalLabel}
                  onConfirm={props.onDelete}
                />
              </div>
            </ProtectedComponent>
            <p>
              {/* {`ID: ${props.video.id}`} */}
              {/* <br /> */}
              {`${translations?.titleLabel}: ${props.video.title}`}
              <br />
              {`${translations?.authorLabel}: ${props.video.author}`}
              <br />
              {`${translations?.lengthLabel}: ${props.video.length} min`}
              <br />
              {`${translations?.descriptionLabel}: ${props.video.description}`}
              <br />
              {`${translations?.urlLinkLabel}: `}
              {<a href={props.video.url}>{props.video.url}</a>}
            </p>
          </div>

          <iframe
            title={props.video.title}
            width={'100%'}
            height={'600'}
            src={props.video.url}
            allowFullScreen
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Video;
