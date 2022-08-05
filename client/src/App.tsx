import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";

import Layout from "./components/Layout/Layout";
import AuthContext from "./store/auth-context";
import ProtectedRoute from "./components/UI/ProtectedRoute";
import { UserRole } from "./models/User";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegistrationPage = React.lazy(() => import("./pages/RegistrationPage"));
const MainPage = React.lazy(() => import("./pages/MainPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const AllTopicsPage = React.lazy(() => import("./pages/AllTopicsPage"));
const CurrentTopicPage = React.lazy(() => import("./pages/CurrentTopicPage"));
const VideoListPage = React.lazy(() => import("./pages/VideoListPage"));
const TestListPage = React.lazy(() => import("./pages/TestListPage"));
const TestPage = React.lazy(() => import("./pages/TestPage"));
const AllUsersPage = React.lazy(() => import("./pages/AllUsersPage"));
const UserPage = React.lazy(() => import("./pages/UserPage"));
const EvaluatedTestPage = React.lazy(() => import("./pages/EvaluatedTestPage"));
const ResetPasswordPage = React.lazy(() => import("./pages/ResetPasswordPage"));
const ForgotPasswordPage = React.lazy(() => import("./pages/ForgotPasswordPage"));

function App() {
  const authContext = useContext(AuthContext);
  const { reAuth } = authContext;
  useEffect(() => {
    reAuth();
  }, [reAuth]);

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centerVertical">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/welcome" element={<MainPage />} />
          <Route element={<ProtectedRoute />}></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/topics" element={<AllTopicsPage />} />
          <Route
            path="/topics/:topicId"
            element={
              <ProtectedRoute>
                <CurrentTopicPage />
              </ProtectedRoute>
            }
          />
          <Route path="/videos" element={<VideoListPage />} />
          <Route path="/tests" element={<TestListPage />} />
          <Route
            path="/tests/:testId"
            element={
              <ProtectedRoute>
                <TestPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute requiredRole={[UserRole.TEACHER, UserRole.ADMIN]}>
                <AllUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <ProtectedRoute requiredRole={[UserRole.TEACHER, UserRole.ADMIN]}>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:userId/tests/:evalTestId"
            element={
              <ProtectedRoute>
                <EvaluatedTestPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/welcome" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
