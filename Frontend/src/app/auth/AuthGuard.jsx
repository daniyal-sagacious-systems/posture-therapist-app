import useAuth from 'app/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();


  console.log("isAuthenticated", isAuthenticated)

  if (isAuthenticated) return <>{children}</>;
    // if (true) return <>{children}</>;


  return <Navigate replace to="/session/signin" state={{ from: pathname }} />;
};

export default AuthGuard;
