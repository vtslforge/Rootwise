import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <h1>My Auth App</h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
