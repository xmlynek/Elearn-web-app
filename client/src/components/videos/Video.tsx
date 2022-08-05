import VideoClass from "../../models/VideoClass";
import { Accordion } from "react-bootstrap";
import OptionIcon from "../../assets/icons/OptionsIcon";
import VideoForm from "./VideoForm";
import ProtectedComponent from "../UI/ProtectedComponent";
import { UserRole } from "../../models/User";
import ModalFormButton from "../UI/ModalFormButton";
import ConfirmDialogButton from "../UI/ConfirmDialogButton";

type Props = {
  className?: string;
  video: VideoClass;
  onModify: (body: VideoClass) => void;
  onDelete: () => void;
};

const Video: React.FC<Props> = (props) => {
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
                <ModalFormButton
                  btnTitle="Upraviť"
                  modalTitle="Úprava existujúceho videa"
                  btnVariant="warning"
                  icon={<OptionIcon />}
                  className={"me-md-2"}
                >
                  <VideoForm
                    submitBtnText="Uložiť zmenu"
                    video={props.video}
                    onSubmit={(data: VideoClass) => props.onModify(data)}
                  />
                </ModalFormButton>
                <ConfirmDialogButton
                  confirmBtnTitle="Vymazať"
                  className="mb-2 mt-2 mb-md-0 mt-md-0"
                  title="Vymazanie videa"
                  headerTitle="Naozaj chcete vymazať toto video?"
                  onConfirm={props.onDelete}
                />
              </div>
            </ProtectedComponent>
            <p>
              {/* {`ID: ${props.video.id}`} */}
              {/* <br /> */}
              {`Názov: ${props.video.title}`}
              <br />
              {`Autor: ${props.video.author}`}
              <br />
              {`Dĺžka: ${props.video.length} minút`}
              <br />
              {`Popis: ${props.video.description}`}
              <br />
              Odkaz: {<a href={props.video.url}>{props.video.url}</a>}
            </p>
          </div>

          <iframe
            title={props.video.title}
            width={"100%"}
            height={"600"}
            src={props.video.url}
            allowFullScreen
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Video;
