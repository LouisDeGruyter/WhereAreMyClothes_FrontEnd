import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';
import {Button} from 'antd'

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = useCallback(

    async () => {
      loginWithRedirect();
    },
    [loginWithRedirect],
  );

  return (
    <Button
    type="primary"
      onClick={handleLogin}
    >
      Log In
    </Button>
  );
}

export default LoginButton;
