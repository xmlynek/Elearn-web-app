import { useContext, useState } from 'react';
import { patch } from '../api/genericApi';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import UpdateModalFormButton from '../components/UI/UpdateModalFormButton';
import ChangePasswordForm from '../components/users/ChangePasswordForm';
import UserForm from '../components/users/UserForm';
import UserInfo from '../components/users/UserInfo';
import useLangTranslation from '../hooks/useLangTranslation';
import usePrivateAxios from '../hooks/usePrivateAccessTokenAxios';
import {
  PatchUserDataRequest,
  UserChangePasswordRequest,
} from '../models/User';
import AuthContext from '../store/auth-context';

const ProfilePage: React.FC = (props) => {
  const translations = useLangTranslation();
  const authCtx = useContext(AuthContext);
  const axiosPrivate = usePrivateAxios('/users');
  const { user } = authCtx;
  const [state, setState] = useState<{
    type?: 'err' | 'success';
    msg: string;
    isLoading: boolean;
  }>({
    msg: '',
    isLoading: false,
  });

  const onChangeDataHandler = async (
    userId: number,
    data: PatchUserDataRequest
  ) => {
    setState({ msg: '', isLoading: true });
    try {
      const res = await patch<PatchUserDataRequest>(axiosPrivate, userId, data);
      authCtx.updateUserData(res);
      setState({
        msg: translations!.dataSuccessfullyChanged,
        type: 'success',
        isLoading: false,
      });
    } catch (err: any) {
      if (err.response.data.message) {
        setState({
          type: 'err',
          msg:
            err.response.data.message === 'Invalid password'
              ? translations?.invalidPassword
              : err.response.data.message,
          isLoading: false,
        });
      } else {
        setState({ type: 'err', msg: err.message, isLoading: false });
      }
    }
  };

  const onChangePasswordHandler = async (
    userId: number,
    passwords: UserChangePasswordRequest
  ) => {
    setState({ msg: '', isLoading: true });
    try {
      await patch<UserChangePasswordRequest>(axiosPrivate, userId, passwords);
      setState({
        msg: translations!.passwordSuccessfullyChanged,
        type: 'success',
        isLoading: false,
      });
    } catch (err: any) {
      if (err.response.data.message) {
        setState({
          type: 'err',
          msg:
            err.response.data.message === 'Invalid password'
              ? translations?.invalidPassword
              : err.response.data.message,
          isLoading: false,
        });
      } else {
        setState({ type: 'err', msg: err.message, isLoading: false });
      }
    }
  };

  if (!user) {
    return <div className="centered">{translations?.userNotFoundReauth}</div>;
  }

  const stateLoadingAndErrorOutput = (
    <>
      {' '}
      {state.isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {state.type === 'err' && state.msg !== '' && (
        <div className="centered error-msg">
          <p className="h4">{state.msg}</p>
        </div>
      )}
      {state.type === 'success' && state.msg !== '' && (
        <div className="centered">
          <p className="h4">{state.msg}</p>
        </div>
      )}
    </>
  );

  return (
    <UserInfo user={user} header={translations?.yourProfileHeader}>
      <UpdateModalFormButton
        modalTitle={translations?.updateProfileModalTitle}
        className={'me-md-2 width-50-991-100'}
        btnTitle={translations?.updateProfileModalButtonTitle}
      >
        <UserForm
          formData={user}
          onSubmitText={translations?.updateSubmitButtonLabel}
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
      </UpdateModalFormButton>

      <UpdateModalFormButton
        modalTitle={translations?.changePasswordModalTitle}
        className={'me-md-2 width-50-991-100 mt-2'}
        btnTitle={translations?.changePasswordModalButtonTitle}
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
      </UpdateModalFormButton>
    </UserInfo>
  );
};

export default ProfilePage;
