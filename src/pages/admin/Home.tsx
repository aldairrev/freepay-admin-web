import useToken from '../../hooks/useToken'
import { useEffect, useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import { logoutUser } from '../../helpers/userHelper';
import Header from '../../components/Header.tsx';
import Breadcrumb from '../../components/Breadcumb.tsx';
import pedidosData from '../../data/pedidos.json';
import Pedido from '../../interfaces/Pedido.ts'
import StatusPedido from '../../components/Pedido/StatusPedido.tsx';

const Home = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const [pedidos, setPedidos]: [pedidos: Pedido[], setPedidoss: any] = useState([]);

  const logout = () => {
    logoutUser();
    navigate("/login");
  }

  if (!token) {
    return (
      <Navigate to="/login" />
    )
  }
  const pages = [
    {
      name: "Admin",
      link: "/"
    },
    {
      name: "Inicio",
      link: "/admin/home"
    },
  ];

  useEffect(() => {
    setPedidos(pedidosData);
    return () => {
      //
    }
  }, [])

  return (
    <div style={{ backgroundColor: "#EEE" }}>
      <Header />
      <main className='bg-white mx-auto container p-4 shadow-lg'>
        <Breadcrumb pages={pages} />
        <div></div>
        <div className='overflow-auto'>
          <table className="table table-bordered">
            <thead className='table-dark'>
              <tr>
                <th>Usuario 1</th>
                <th >BNC Usuario 1</th>
                <th>Monto</th>
                <th>BNC Usuario 2</th>
                <th>Usuario 2</th>
                <th style={{width: "200px !important"}}>Descripción</th>
                <th>Proceso de Pago</th>
                <th>Realizar transferencia</th>
                <th>Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => {
                return (
                  <tr key={pedido.id} style={{ "verticalAlign": "middle" }}>
                    <td className='fw-bold'>{pedido.user_one}</td>
                    <td>{pedido.user_one_ban}</td>
                    <td>{pedido.amount}</td>
                    <td>{pedido.user_two_ban}</td>
                    <td className='fw-bold'>{pedido.user_two}</td>
                    <td>{pedido.description}</td>
                    <td className='text-center'>{<StatusPedido status={pedido.status}/>}</td>
                    <td></td>
                    <td></td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>
        <button className='btn btn-success' onClick={logout}>Salir</button>
      </main>
    </div>
  )
};

export default Home;
