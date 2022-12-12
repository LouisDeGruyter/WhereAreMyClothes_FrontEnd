import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router';
import {Spin} from 'antd';

export default function RequireAuth({ children }) { 
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) { 
    return <Spin spinning={true} />;
  }

  if (isAuthenticated) { 
    return children;
  }

  return <Navigate to="/login" />; 
}
