import React, { useContext } from 'react';
import { Accordion, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TestClass from '../../models/TestClass';
import { UserRole } from '../../models/User';
import TestContext from '../../store/test-context';
import ProtectedComponent from '../UI/ProtectedComponent';
import TestForm from './TestForm';
import UpdateModalFormButton from '../UI/UpdateModalFormButton';
import DeleteDialogButton from '../UI/DeleteDialogButton';
import useLangTranslation from '../../hooks/useLangTranslation';

type Props = {
  tests: TestClass[];
};

const TestList: React.FC<Props> = (props) => {
  const testCtx = useContext(TestContext);
  const translations = useLangTranslation();

  const getMaxPointsCount = (test: TestClass): number => {
    let sum = 0;
    test.questions.forEach((question) => (sum += +question.points));
    return sum;
  };

  return (
    <ListGroup className="maxwidth-720">
      <Accordion>
        {props.tests.map((test) => (
          <Accordion.Item eventKey={'' + test.id} key={test.id}>
            <Accordion.Header>
              <p className="h4 m-0">{test.title}</p>
            </Accordion.Header>
            <Accordion.Body>
              <ProtectedComponent
                requiredRole={[UserRole.ADMIN, UserRole.TEACHER]}
              >
                <div className=" d-flex flex-column d-md-block float-md-end">
                  <UpdateModalFormButton
                    modalTitle={translations?.testUpdateModalTitle}
                  >
                    <TestForm
                      onSubmit={testCtx.modifyTest.bind(null, test.id)}
                      submitBtnText={translations?.updateSubmitButtonLabel}
                      formField={test}
                    />
                  </UpdateModalFormButton>
                  <DeleteDialogButton
                    className="mb-2 mt-2 mb-md-0 mt-md-0"
                    title={translations?.deleteTestModalTitle}
                    headerTitle={translations?.deleteTestModalLabel}
                    onDelete={testCtx.deleteTest.bind(null, test.id)}
                  />
                </div>
              </ProtectedComponent>
              <p>
                {`${translations?.titleLabel}: ${test.title}`}
                <br />
                {`${translations?.numberOfQuestionsLabel}: ${test.questions.length}`}
                <br />
                {`${translations?.maxAmountOfPointsLabel}: ${getMaxPointsCount(
                  test
                )}`}
              </p>

              <div className="text-center">
                <Link
                  className="width-responsive btn btn-primary"
                  to={`/tests/${test.id}`}
                >
                  {translations?.takeTestLabel}
                </Link>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </ListGroup>
  );
};

export default TestList;
