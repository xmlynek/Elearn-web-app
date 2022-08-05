import { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import TopicItem from "../components/topics/TopicItem";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import TopicContext from "../store/topic-context";
import DeleteDialogButton from "../components/UI/DeleteDialogButton";
import ProtectedComponent from "../components/UI/ProtectedComponent";
import { UserRole } from "../models/User";
import ContainerWrapper from "../components/Layout/ContainerWrapper";
import ModalFormButton from "../components/UI/ModalFormButton";
import OptionIcon from "../assets/icons/OptionsIcon";
import TopicForm from "../components/topics/TopicForm";

function CurrentTopicPage() {
  const params = useParams();
  const topicId = params.topicId;

  const topicCtx = useContext(TopicContext);
  const { error, opStatus: status, topics } = topicCtx.data;
  let fetchById = topicCtx.fetchById;

  const navigate = useNavigate();

  useEffect(() => {
    if (topicId && parseInt(topicId) > 0) {
       fetchById(parseInt(topicId));
    }
  }, []);

  const deleteHandler = (id: any) => {
    if (id && typeof id === "string") {
      topicCtx.deleteTopic(parseInt(id));
      if (status === "Finished") {
        navigate("/topics");
      }
    }
  };

  const editHandler = (id: any, topic: FormData) => {
    if (id && typeof id === "string") {
      topicCtx.modifyTopic(parseInt(id), topic, true);
    }
  };

  if (status === "Pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (
    error ||
    status === "Failure" ||
    (status === "Finished" && (!topics || topics.length === 0))
  ) {
    return (
      <p className="centerVertical h1 bg-info py-2 px-3">
        {error === "Request failed with status code 404"
          ? `Topik s ID ${topicId} nebol nájdený`
          : error}
      </p>
    );
  }

  return (
    <ContainerWrapper>
      <Row>
        <Col>
          <div>
            <ProtectedComponent
              requiredRole={[UserRole.ADMIN, UserRole.TEACHER]}
            >
              <div className="d-flex flex-column d-md-block float-md-end">
                <ModalFormButton
                  btnTitle="Upraviť"
                  modalTitle="Úprava existujúceho Topiku"
                  btnVariant="warning"
                  icon={<OptionIcon />}
                  className={"me-md-2"}
                >
                  <TopicForm
                    onSubmit={editHandler.bind(null, topicId)}
                    formField={topics[0]}
                    onSubmitText={"Potvrdiť zmeny"}
                  />
                </ModalFormButton>
                <DeleteDialogButton
                  onDelete={deleteHandler.bind(null, topicId)}
                  headerTitle="Potvrdenie vymazania topiku"
                  className="ms-md-2 mb-2 mt-2 mb-md-0 mt-md-0"
                  title={`Naozaj chcete vymazať tento topik? '${topics[0].title}'`}
                />
              </div>
            </ProtectedComponent>
          </div>
        </Col>
      </Row>
      <Row>
        <TopicItem topic={topics[0]} />
      </Row>
    </ContainerWrapper>
  );
}

export default CurrentTopicPage;
