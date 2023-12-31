import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'antd';
import { useCallback } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import Error from '../Error';
import LoginButton from './LoginButton';
const buttonStyle = {
  marginTop: 10,
};

export default function AuthLanding() {
  const navigate = useNavigate();
  const { error, isAuthenticated, isLoading } = useAuth0();
  const handleButton = useCallback( () =>{
    navigate("/");
  },[]);


  if (error) {
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Login failed</h1>
          <p>
            Sorry, we were unable to sign you in, the error below might be useful.
          </p>
          <Error error={error} />
          <div><LoginButton /></div>
            
            <div style={{marginTop:10}}><Button onClick={()=> navigate("/")}>Home</Button></div>
        </div>
      </div>
    </div>;
  }

  if (!isLoading && isAuthenticated) {
    
    return <Navigate to="/" />;
  }

  if (!isLoading && !isAuthenticated) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Login required</h1>
            <p>You need to login to access this page.</p>
            <div><LoginButton /></div>
            
            <div style={buttonStyle}><Button onClick={handleButton}>Home</Button></div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Signing in</h1>
          <p>
            Please wait while we sign you in!
          </p>
        </div>
      </div>
    </div>
  );
}
