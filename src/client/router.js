import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// Lazy import ./components/pages/Home
// Lazy import ./components/pages/404
const Home = React.lazy(() => import("./components/pages/home"));
const Login = React.lazy(() => import("./components/pages/login"));
const Register = React.lazy(() => import("./components/pages/register"));
const NotFound = React.lazy(() => import("./components/pages/404"));

export default function RouterComponent() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        }
      />

      <Route
        exact
        path="/login"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />

      <Route
        exact
        path="/register"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        }
      />

      {/* Not found route */}
      <Route
        path="*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}
