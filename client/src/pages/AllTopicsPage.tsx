import { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ModalLayout from '../components/Layout/ModalLayout';

import TopicForm from '../components/topics/TopicForm';
import TopicList from '../components/topics/TopicList';
import ContainerWrapper from '../components/Layout/ContainerWrapper';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ProtectedComponent from '../components/UI/ProtectedComponent';
import { UserRole } from '../models/User';
import TopicContext from '../store/topic-context';
import useLangTranslation from '../hooks/useLangTranslation';

function AllTopicsPage() {
  const translations = useLangTranslation();
  const topicCtx = useContext(TopicContext);
  const { error, opStatus: status, topics } = topicCtx.data;
  const fetchAll = topicCtx.fetchAll;

  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  let output;

  const newTopic = (
    <ProtectedComponent requiredRole={[UserRole.ADMIN, UserRole.TEACHER]}>
      <div className="centered">
        <Button onClick={() => setIsShown(true)}>
          {translations?.createNewTopicTitle}
        </Button>
        <ModalLayout
          title={translations?.createNewTopicTitle}
          backdropType={'static'}
          show={isShown}
          onHide={() => setIsShown(false)}
        >
          <TopicForm
            onSubmitText={translations?.createTopicSubmitButtonTitle}
            onSubmit={(data: FormData) => {
              topicCtx.saveTopic(data);
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

  if (status === 'Finished' && (!topics || topics.length === 0)) {
    output = (
      <>
        <div className="centered">
          <p className="h4">{translations?.noTopicsFound}</p>
        </div>
      </>
    );
  }

  if (status === 'Finished' && !error && topics && topics.length > 0) {
    output = (
      <>
        <div className="maxwidth-720">
          <TopicList className="center h5" topics={topics} />
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
              {translations?.topicListPageHeader}
            </h2>
          </div>
          {newTopic}
        </Col>
      </Row>
      <Row>
        <Col>{output}</Col>
      </Row>
    </ContainerWrapper>
  );
}

export default AllTopicsPage;
