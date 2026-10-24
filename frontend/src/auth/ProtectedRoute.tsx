import { Navigate, Outlet } from "react-router";
import { authClient } from "../lib/auth.client";


const ProtectedRoute = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <p>Checking authentication...</p>;
  }

  if (!session) {
    return <Navigate to="/signup" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;