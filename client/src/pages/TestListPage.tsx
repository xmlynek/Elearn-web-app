import { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ModalLayout from '../components/Layout/ModalLayout';
import TestForm from '../components/tests/TestForm';
import TestList from '../components/tests/TestList';
import ContainerWrapper from '../components/Layout/ContainerWrapper';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ProtectedComponent from '../components/UI/ProtectedComponent';
import TestClass from '../models/TestClass';
import { UserRole } from '../models/User';
import TestContext from '../store/test-context';
import useLangTranslation from '../hooks/useLangTranslation';

const TestListPage: React.FC = () => {
  const testCtx = useContext(TestContext);
  const translations = useLangTranslation();

  const { error, opStatus: status, tests } = testCtx.data;
  const fetchAll = testCtx.fetchAll;

  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  let output;

  const modalFormButton = (
    <ProtectedComponent requiredRole={[UserRole.ADMIN, UserRole.TEACHER]}>
      <div className="centered">
        <Button onClick={() => setIsShown(true)}>
          {translations?.createNewTestTitle}
        </Button>
        <ModalLayout
          title={translations?.createNewTestTitle}
          backdropType={'static'}
          show={isShown}
          onHide={() => setIsShown(false)}
        >
          <TestForm
            onSubmit={(data: TestClass) => {
              testCtx.saveTest(data);
              setIsShown(false);
            }}
            submitBtnText={translations?.createTestSubmitButtonTitle}
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

  if (status === 'Finished' && (!tests || tests.length === 0)) {
    output = (
      <>
        <div className="centered">
          <p className="h4">{translations?.noTestsFound}</p>
        </div>
      </>
    );
  }

  if (status === 'Finished' && !error && tests && tests.length > 0) {
    output = (
      <>
        <div className="maxwidth-720">
          <TestList tests={tests} />
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
              {translations?.testListHeader}
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

export default TestListPage;
