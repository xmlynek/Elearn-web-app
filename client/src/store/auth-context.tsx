import Cookies from 'js-cookie';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../api/config';
import User, {
  extracRole,
  PatchUserDataRequest,
  UserRegistrationRequest,
} from '../models/User';

type AuthContextData = {
  token: string;
  isLoggedIn: Boolean;
  isLoading: Boolean;
  error: string;
  success: Boolean;
  user: User | null;
  login: (email: string, password: string, locationState?: string) => void;
  logout: () => void;
  register: (data: UserRegistrationRequest) => void;
  refreshToken: () => any;
  reAuth: () => void;
  updateUserData: (data: any) => void;
  resetPassword: (data: any, token: String) => void;
  forgotPassword: (email: String) => void;
  resetStateVariables: () => void;
};

const AuthContext = React.createContext<AuthContextData>({
  isLoggedIn: false,
  isLoading: false,
  success: false,
  error: '',
  token: '',
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  refreshToken: () => '',
  reAuth: () => {},
  updateUserData: () => {},
  resetPassword: () => {},
  forgotPassword: () => {},
  resetStateVariables: () => {},
});

export const AuthContextProvider: React.FC = (props) => {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [success, setSuccess] = useState<Boolean>(false);
  const [error, setError] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const reAuthHandler = useCallback(async () => {
    const reauth = Cookies.get('reauth') !== undefined;
    if (reauth) {
      axiosPrivate
        .get('/auth/user')
        .then((res) => {
          createUserFromResponse(res);
          setLoggedIn(true);
        })
        .catch((err) => {});
    }
  }, []);

  const refreshTokenHandler = useCallback(async () => {
    let newToken;
    await axiosPrivate
      .post('/auth/refresh-token')
      .then((res) => {
        setAccessToken(res.data?.token);
        sessionStorage.setItem('token', res.data?.token);
        newToken = res.data?.token;
      })
      .catch((err) => {
        setAccessToken('');
        setLoggedIn(false);
        setError(
          err.message === 'Request failed with status code 401'
            ? 'Problém s autentifikáciou, je potrebné opätovné prihlásenie'
            : err.message
        );
        setUser(null);
        logoutHandler();
        navigate('login');
      });

    return newToken;
  }, [navigate]);

  const loginHandler = async (
    email: string,
    password: string,
    locationState?: string
  ) => {
    setLoading(true);
    setError('');
    await axiosPrivate
      .post('/auth/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        createUserFromResponse(res);
        setAccessToken(res.data?.token);
        sessionStorage.setItem('token', res.data?.token);
        Cookies.set('reauth', '1');
        setLoggedIn(true);
        setError('');
        navigate(locationState ? locationState : '/', { replace: true });
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ? err.response.data.message : err.message
        );
        setLoggedIn(false);
      });
    setLoading(false);
  };

  const registrationHandler = async (data: UserRegistrationRequest) => {
    setLoading(true);
    setError('');
    await axiosPrivate
      .post('/auth/register', data)
      .then((res) => {
        createUserFromResponse(res);
        setAccessToken(res.data?.token);
        setLoggedIn(true);
        setError('');
        navigate('/');
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ? err.response.data.message : err.message
        );
        setLoggedIn(false);
      });
    setLoading(false);
  };

  const logoutHandler = async () => {
    await axiosPrivate.post('/auth/logout').catch((err) => {});
    Cookies.remove('reauth');
    setAccessToken('');
    setLoading(false);
    setError('');
    setLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const createUserFromResponse = (res: any) => {
    const { id, firstname, lastname, email, role } = res.data.user;
    setUser(
      (state) => new User(id, firstname, lastname, email, extracRole(role))
    );
  };

  const updateUserDataHandler = (data: PatchUserDataRequest) => {
    setUser((prev) => {
      return new User(
        prev!.id,
        data.firstname,
        data.lastname,
        data.email,
        prev!.role
      );
    });
  };

  const resetPasswordHandler = async (data: any, token: String) => {
    setLoading(true);
    setSuccess(false);
    setError('');
    await axiosPrivate
      .post(`/auth/reset-password/${token}`, {
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      })
      .then((res) => {
        setSuccess(true);
      })
      .catch((err) => {
        setError('Platnosť tokenu vypršala!');
      });
    setLoading(false);
  };

  const forgotPasswordHandler = async (email: String) => {
    setLoading(true);
    setSuccess(false);
    setError('');
    await axiosPrivate
      .post('/auth/forgot-password', { email: email })
      .then((res) => {
        setSuccess(true);
      })
      .catch((err) => {
        setError(
          err.message.includes('404')
            ? `Používateľ s emailom ${email} sa nenašiel`
            : `Email sa nepodarilo odoslať, vyskúšajte to prosím neskôr`
        );
      });
    setLoading(false);
  };

  const resetStateVariablesHandler = useCallback(() => {
    setLoading(false);
    setError('');
    setSuccess(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: loggedIn,
        isLoading: loading,
        error: error,
        user: user,
        success: success,
        token: accessToken,
        login: loginHandler,
        logout: logoutHandler,
        register: registrationHandler,
        refreshToken: refreshTokenHandler,
        reAuth: reAuthHandler,
        updateUserData: updateUserDataHandler,
        resetPassword: resetPasswordHandler,
        forgotPassword: forgotPasswordHandler,
        resetStateVariables: resetStateVariablesHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;