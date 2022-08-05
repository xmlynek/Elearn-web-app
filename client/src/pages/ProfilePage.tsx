import { useContext, useState } from "react";
import { patch } from "../api/genericApi";
import OptionIcon from "../assets/icons/OptionsIcon";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ModalFormButton from "../components/UI/ModalFormButton";
import ChangePasswordForm from "../components/users/ChangePasswordForm";
import UserForm from "../components/users/UserForm";
import UserInfo from "../components/users/UserInfo";
import usePrivateAxios from "../hooks/usePrivateAccessTokenAxios";
import {
  PatchUserDataRequest,
  UserChangePasswordRequest,
} from "../models/User";
import AuthContext from "../store/auth-context";

const ProfilePage: React.FC = (props) => {
  const authCtx = useContext(AuthContext);
  const axiosPrivate = usePrivateAxios("/users");
  const { user } = authCtx;
  const [state, setState] = useState<{
    type?: "err" | "success";
    msg: string;
    isLoading: boolean;
  }>({
    msg: "",
    isLoading: false,
  });

  const onChangeDataHandler = async (
    userId: number,
    data: PatchUserDataRequest
  ) => {
    setState({ msg: "", isLoading: true });
    try {
      const res = await patch<PatchUserDataRequest>(
        axiosPrivate,
        userId,
        data
      );
      authCtx.updateUserData(res);
      setState({
        msg: "Údaje boli úspešne zmenené",
        type: "success",
        isLoading: false,
      });
    } catch (err: any) {
      if (err.response.data.message) {
        setState({
          type: "err",
          msg:
            err.response.data.message === "Invalid password"
              ? "Nesprávne heslo"
              : err.response.data.message,
          isLoading: false,
        });
      } else {
        setState({ type: "err", msg: err.message, isLoading: false });
      }
    }
  };

  const onChangePasswordHandler = async (
    userId: number,
    passwords: UserChangePasswordRequest
  ) => {
    setState({ msg: "", isLoading: true });
    try {
      await patch<UserChangePasswordRequest>(axiosPrivate, userId, passwords);
      setState({
        msg: "Heslo bolo úspešne zmenené",
        type: "success",
        isLoading: false,
      });
    } catch (err: any) {
      if (err.response.data.message) {
        setState({
          type: "err",
          msg:
            err.response.data.message === "Invalid password"
              ? "Nesprávne heslo"
              : err.response.data.message,
          isLoading: false,
        });
      } else {
        setState({ type: "err", msg: err.message, isLoading: false });
      }
    }
  };

  const callbackFuncHandler = () => {
    setState({ msg: "", isLoading: false });
  };

  if (!user) {
    return (
      <div className="centered">
        Používateľ nebol nájdený, skúste sa prihlásiť znova
      </div>
    );
  }

  const stateLoadingAndErrorOutput = (
    <>
      {" "}
      {state.isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {state.type === "err" && state.msg !== "" && (
        <div className="centered error-msg">
          <p className="h4">{state.msg}</p>
        </div>
      )}
      {state.type === "success" && state.msg !== "" && (
        <div className="centered">
          <p className="h4">{state.msg}</p>
        </div>
      )}
    </>
  );

  return (
    <UserInfo user={user} header="Váš profil">
      <ModalFormButton
        callbackFunc={callbackFuncHandler}
        btnTitle="Upraviť údaje"
        modalTitle="Úprava údajov"
        btnVariant="warning"
        icon={<OptionIcon />}
        className={"me-md-2 width-50-991-100"}
      >
        <UserForm
          formData={user}
          onSubmitText="Zmeniť"
          onSubmit={(val: any) => {
            onChangeDataHandler(user.id, {
              email: val.email,
              firstname: val.firstname,
              lastname: val.lastname,
              password: val.password,
            });
          }}
        />
        {stateLoadingAndErrorOutput}
      </ModalFormButton>

      <ModalFormButton
        callbackFunc={callbackFuncHandler}
        btnTitle="Zmeniť heslo"
        modalTitle="Zmena hesla"
        btnVariant="warning"
        icon={<OptionIcon />}
        className={"me-md-2 width-50-991-100 mt-2"}
      >
        <ChangePasswordForm
          onSubmit={(values: any) => {
            onChangePasswordHandler(user.id, {
              password: values.currentPassword,
              newPassword: values.newPassword,
              confirmNewPassword: values.confirmNewPassword,
            });
          }}
        />
        {stateLoadingAndErrorOutput}
      </ModalFormButton>
    </UserInfo>
  );
};

export default ProfilePage;
