import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OptionIcon from "../assets/icons/OptionsIcon";
import DeleteDialogButton from "../components/UI/DeleteDialogButton";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ModalFormButton from "../components/UI/ModalFormButton";
import ProtectedComponent from "../components/UI/ProtectedComponent";
import UserForm from "../components/users/UserForm";
import UserInfo from "../components/users/UserInfo";
import { UserRequest, UserRole } from "../models/User";
import AuthContext from "../store/auth-context";
import UserContext from "../store/user-context";

type Props = {};

const UserPage: React.FC<Props> = (props) => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const userId = params.userId;
  const navigate = useNavigate();

  const userCtx = useContext(UserContext);
  const { fetchById, data, updateUser, deleteUser } = userCtx;
  const { opStatus: status, users, error } = data;

  useEffect(() => {
    if (userId && parseInt(userId) > 0) {
      if (parseInt(userId) === authCtx.user?.id) {
        navigate("/profile", { replace: true });
      } else {
        fetchById(parseInt(userId));
      }
    }
  }, [fetchById, userId, authCtx.user?.id, navigate]);

  const updateHandler = (id: any, body: UserRequest) => {
    if (id && typeof id === "string") {
      updateUser(parseInt(id), body, true);
    }
  };

  const deleteHandler = (id: any) => {
    if (id && typeof id === "string") {
      deleteUser(parseInt(id));
      navigate("/users", { replace: true });
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
    (status === "Finished" && (!users || users.length === 0))
  ) {
    return (
      <p className="centerVertical h1 bg-info py-2 px-3">
        {error === "Request failed with status code 404"
          ? `Používateľ s ID ${userId} nebol nájdený`
          : error}
      </p>
    );
  }

  return (
    <>
      <UserInfo user={users[0]}>
        <ProtectedComponent requiredRole={[UserRole.ADMIN]}>
          <ModalFormButton
            btnTitle="Upraviť údaje"
            modalTitle="Úprava údajov"
            btnVariant="warning"
            icon={<OptionIcon />}
            className={"me-md-2 width-50-991-100"}
          >
            <UserForm
              allowRoleChange={true}
              ignorePassword={true}
              formData={users[0]}
              onSubmitText="Zmeniť"
              onSubmit={(values: any) => {
                updateHandler(userId, {
                  email: values.email,
                  firstname: values.firstname,
                  lastname: values.lastname,
                  role: values.role,
                });
              }}
            />
          </ModalFormButton>
          <DeleteDialogButton
            className="me-md-2 width-50-991-100 mt-2"
            onDelete={deleteHandler.bind(null, userId)}
            title="Potvrdenie vymazania používateľa"
            headerTitle={`Naozaj chcete vymazať tohto používateľa?`}
          />
        </ProtectedComponent>
      </UserInfo>
    </>
  );
};

export default UserPage;
