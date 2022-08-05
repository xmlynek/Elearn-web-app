import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import usePrivateAxios from '../../hooks/usePrivateAccessTokenAxios';
import { EvalutedTest } from '../../models/EvaluatedTest';
import User from '../../models/User';
import EvaluatedTestsList from '../tests/EvaluatedTestsList';
import ContainerWrapper from '../Layout/ContainerWrapper';
import LoadingSpinner from '../UI/LoadingSpinner';

type Props = {
  user: User;
  header?: string;
};

const UserInfo: React.FC<Props> = (props) => {
  const { user, header } = props;

  const [evalTests, setEvalTests] = useState<EvalutedTest[]>();

  const [state, setState] = useState<{
    status?: 'err' | 'success';
    isLoading: boolean;
    msg?: string;
  }>({
    status: 'success',
    isLoading: false,
  });
  const axiosPrivate = usePrivateAxios('/users');

  const loadTestsHandler = async () => {
    try {
      setEvalTests([]);
      setState({ isLoading: true });
      const res = await axiosPrivate.get(`${user.id}/tests`);
      setState({ status: 'success', isLoading: false });
      setEvalTests(res.data);
    } catch (err: any) {
      setState({
        status: 'err',
        isLoading: false,
        msg: err?.response?.data?.message
          ? err?.response?.data?.message
          : err.message,
      });
    }
  };

  const evalTestListOutput = (
    <>
      {state.isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {state.status === 'err' && !state.isLoading && (
        <div className="centered error-msg">
          <p className="h4">{state.msg}</p>
        </div>
      )}
      {state.status === 'success' && !state.isLoading && evalTests && (
        <div className='mt-4'>
          <h3>Vypracované testy</h3>
          <EvaluatedTestsList tests={evalTests} />
        </div>
      )}
    </>
  );

  return (
    <ContainerWrapper>
      <Row>
        <Col>
          <div className="centered">
            <h2 className="display-2 txt-main">
              {header ? header : `Profil používateľa ${user.firstname}`}
            </h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Row>
          <Col>
            <p className="float-end">ID</p>
          </Col>
          <Col>{user.id}</Col>
        </Row>
        <Row>
          <Col>
            <p className="float-end">Meno</p>
          </Col>
          <Col>{user.firstname}</Col>
        </Row>
        <Row>
          <Col>
            <p className="float-end">Priezvisko</p>
          </Col>
          <Col>{user.lastname}</Col>
        </Row>
        <Row>
          <Col>
            <p className="float-end">Email</p>
          </Col>
          <Col>{user.email}</Col>
        </Row>
        <Row>
          <Col>
            <p className="float-end">Typ účtu</p>
          </Col>
          <Col>{user.role}</Col>
        </Row>

        <div className="text-center mt-3">{props.children}</div>
        <div className="text-center mt-2">
          <Button onClick={loadTestsHandler} className="me-2 width-50-991-100">
            Zobraziť vypracované testy
          </Button>
          {evalTestListOutput}
        </div>
      </Row>
    </ContainerWrapper>
  );
};

export default UserInfo;
