import React, { useContext } from 'react';
import { Accordion, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TestClass from '../../models/TestClass';
import { UserRole } from '../../models/User';
import TestContext from '../../store/test-context';
import OptionIcon from '../../assets/icons/OptionsIcon';
import ConfirmDialogButton from '../UI/ConfirmDialogButton';
import ModalFormButton from '../UI/ModalFormButton';
import ProtectedComponent from '../UI/ProtectedComponent';
import TestForm from './TestForm';

type Props = {
  tests: TestClass[];
};

const TestList: React.FC<Props> = (props) => {
  const testCtx = useContext(TestContext);

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
                  <ModalFormButton
                    btnTitle="Upraviť"
                    modalTitle="Úprava existujúceho testu"
                    btnVariant="warning"
                    icon={<OptionIcon />}
                    className={'me-md-2'}
                  >
                    <TestForm
                      onSubmit={testCtx.modifyTest.bind(null, test.id)}
                      submitBtnText="Potvrdiť zmeny"
                      formField={test}
                    />
                  </ModalFormButton>

                  <ConfirmDialogButton
                    confirmBtnTitle="Vymazať"
                    className="mb-2 mt-2 mb-md-0 mt-md-0"
                    title="Vymazanie testu"
                    headerTitle="Naozaj chcete vymazať tento test?"
                    onConfirm={testCtx.deleteTest.bind(null, test.id)}
                  />
                </div>
              </ProtectedComponent>
              <p>
                {`Názov: ${test.title}`}
                <br />
                {`Počet otázok: ${test.questions.length}`}
                <br />
                {`Maximálny počet bodov: ${getMaxPointsCount(test)}`}
              </p>

              <div className="text-center">
                <Link
                  className="width-responsive btn btn-primary"
                  to={`/tests/${test.id}`}
                >
                  Písať test
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
