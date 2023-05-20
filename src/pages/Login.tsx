import { useEffect, useState } from 'react';
import useToken from '../hooks/useToken';
import { Navigate, useNavigate } from "react-router-dom";
import Loader from '../components/Loader';

const Login = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(true)

  if (token) {
    return <Navigate to="/admin/home" />
  }

  async function LoginUser(credentials: any) {
    // return fetch('http://localhost:8080/login',{
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    // }).then(data => data.json())
    await delay(3000);

    return {
      token: "freepay"
    }
  }

  function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  const handleSubmit = async (e: any) => {
    setLoading(true);
    const respToken = await LoginUser({
      username,
      password
    })
    setLoading(false);
    if (respToken) {
      setToken(respToken.token);
      navigate("/admin/home")
    }
  }

  useEffect(() => {
    setLoading(false);
    return () => {
      //
    };
  }, []);

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username || ''}
            onChange={(e: any) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password || ''}
            onChange={(e: any) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </>
  );
};

export default Login;
