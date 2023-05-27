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
    return new Promise(resolve => setTimeout(resolve, ms));
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
      <Loader />
    );
  }

  return (
    <>
      <main className="form-signin mt-5">
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px"}}>
          {/* <img className="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}
          <h1 className="h1 mb-3 fw-bolder"  style={{ color: "#eb9e31" }}>Frepay</h1>
          <h3 className="h3 mb-3 fw-normal">Ingresa</h3>

          <div className="form-floating">
            <input
              type="text"
              id="username"
              className='form-control'
              value={username || ''}
              onChange={(e: any) => setUsername(e.target.value)}
              required
              placeholder="Usuario" />
            <label htmlFor="floatingInput">Usuario</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              id="password"
              value={password || ''}
              onChange={(e: any) => setPassword(e.target.value)}
              required
              className='form-control'
              placeholder="Contraseña" />
            <label htmlFor="floatingPassword">Contraseña</label>
          </div>
          <button className="w-100 btn btn-lg btn-secondary mt-5" type="submit">Ingresar</button>
          <p className="mt-5 mb-3 text-muted">© Frepay 2023</p>
        </form>
      </main>
    </>
  );
};

export default Login;
