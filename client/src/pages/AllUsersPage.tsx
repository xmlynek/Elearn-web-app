import { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ModalLayout from '../components/Layout/ModalLayout';
import ContainerWrapper from '../components/Layout/ContainerWrapper';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ProtectedComponent from '../components/UI/ProtectedComponent';
import UserForm from '../components/users/UserForm';
import UserList from '../components/users/UserList';
import { UserRole } from '../models/User';
import UserContext from '../store/user-context';
import useLangTranslation from '../hooks/useLangTranslation';

const AllUsersPage: React.FC = (props) => {
  const translations = useLangTranslation();
  const userCtx = useContext(UserContext);
  const { fetchAll, data, save } = userCtx;
  const { error, opStatus: status, users } = data;

  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  let output;

  const modalFormButton = (
    <ProtectedComponent requiredRole={[UserRole.ADMIN]}>
      <div className="centered">
        <Button onClick={() => setIsShown(true)}>
          {translations?.createNewUserTitle}
        </Button>
        <ModalLayout
          title={translations?.createNewUserTitle}
          backdropType={'static'}
          show={isShown}
          onHide={() => setIsShown(false)}
        >
          <UserForm
            allowRoleChange={true}
            onSubmit={(values: any) => {
              save({
                role: values.role,
                email: values.email,
                firstname: values.firstname,
                lastname: values.lastname,
                password: values.password,
              });
              setIsShown(false);
            }}
            onSubmitText={translations?.createUserSubmitButtonTitle}
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

  if (status === 'Finished' && (!users || users.length === 0)) {
    output = (
      <>
        <div className="centered">
          <p className="h4">{translations?.noUsersFound}</p>
        </div>
      </>
    );
  }

  if (status === 'Finished' && !error && users && users.length > 0) {
    output = (
      <>
        <div className="maxwidth-720">
          <UserList users={users} />
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
              {translations?.userListPageHeader}
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

export default AllUsersPage;
