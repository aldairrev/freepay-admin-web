import useToken from '../../hooks/useToken'
import { useEffect, useState } from 'react';
import { useNavigate, Navigate, json } from "react-router-dom";
import { logoutUser } from '../../helpers/userHelper';
import Header from '../../components/Header.tsx';
import Breadcrumb from '../../components/Breadcumb.tsx';
import pedidosData from '../../data/pedidos.json';
import StatusPedido from '../../components/Pedido/StatusPedido.tsx';
import PaginationPedido from '../../interfaces/Pagination/PaginationPedido.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const [paginationPedido, setPaginationPedido]: [paginationPedido: PaginationPedido, setPaginationPedido: any] = useState({
    data: [],
    from: 1,
    per_page: 10,
    current: 1,
  });

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

  const changePage = (page_num: number) => {
    const data = JSON.parse(JSON.stringify(pedidosData));
    const perPage = 10;
    const fromPage = 1;
    const toPage = Math.floor((data.length - 1) / perPage);
    const random_num = Math.round(Math.random() * 20);
    console.log(data);
    console.log(random_num, random_num + perPage);
    console.log(data.slice((page_num - 1) * perPage, perPage));
    setPaginationPedido({
      from: fromPage,
      data: data.slice(random_num, random_num + perPage),
      to: toPage,
      per_page: perPage,
      current: page_num,
      prev: page_num  > fromPage ? page_num - 1 : null,
      next: toPage && page_num + 1  < toPage ? page_num + 1 : null,
      total: data.length,
    });
  };

  useEffect(() => {
    changePage(1);
    return () => {
      //
    }
  }, []);

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
                <th style={{ width: "200px !important" }}>Descripción</th>
                <th>Proceso de Pago</th>
                <th>Realizar transferencia</th>
                <th>Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {paginationPedido.data.map((pedido) => {
                return (
                  <tr key={pedido.id} style={{ "verticalAlign": "middle" }}>
                    <td className='fw-bold'>{pedido.user_one}</td>
                    <td>{pedido.user_one_ban}</td>
                    <td>{pedido.amount}</td>
                    <td>{pedido.user_two_ban}</td>
                    <td className='fw-bold'>{pedido.user_two}</td>
                    <td>{pedido.description}</td>
                    <td className='text-center'>{<StatusPedido status={pedido.status} />}</td>
                    <td></td>
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='btn-group'>
              <button className='btn btn-secondary' onClick={ () => { changePage(paginationPedido.prev ||  1) }} disabled={ !paginationPedido.prev }>
                <FontAwesomeIcon icon={['fas', 'chevron-left']} />
              </button>
              {
                paginationPedido.from ? (
                  <button className='btn btn-secondary' onClick={ () => { changePage(paginationPedido.from) }} disabled={paginationPedido.from == paginationPedido.current}>
                    { paginationPedido.from }
                  </button>
                ) : ""
              }
              {
                paginationPedido.from && paginationPedido.current > 2 ? (
                  <button className='btn btn-secondary' disabled>
                    ...
                  </button>
                ) : ""
              }
              {
                paginationPedido.prev && paginationPedido.prev > paginationPedido.from + 1  ? (
                  <button className='btn btn-secondary' onClick={ () => { changePage(paginationPedido.current - 1)} }>
                    { paginationPedido.current - 1 }
                  </button>
                ) : ""
              }
              {
                paginationPedido.to && paginationPedido.from && !(paginationPedido.from == paginationPedido.current || paginationPedido.to == paginationPedido.current) ? (
                  <button className='btn btn-secondary' disabled>
                    { paginationPedido.current }
                  </button>
                ) : ""
              }
              {
                paginationPedido.next ? (
                  <button className='btn btn-secondary' onClick={ () => { changePage(paginationPedido.next || 1)} }>
                    { paginationPedido.current + 1 }
                  </button>
                ) : ""
              }
              {
                paginationPedido.to && paginationPedido.to - 3 > paginationPedido.current ? (
                  <button className='btn btn-secondary' disabled>
                    ...
                  </button>
                ) : ""
              }
              {
                paginationPedido.to ? (
                  <button className='btn btn-secondary' onClick={ () => { changePage(paginationPedido.to || 1)} } disabled={paginationPedido.to == paginationPedido.current}>
                    { paginationPedido.to }
                  </button>
                ) : ""
              }
              <button className='btn btn-secondary' onClick={ () => { changePage(paginationPedido.next ||  1) }} disabled={ !paginationPedido.next }>
                <FontAwesomeIcon icon={['fas', 'chevron-right']} />
              </button>
            </div>
          </div>
        </div>
        <button className='btn btn-success' onClick={logout}>Salir</button>
      </main>
    </div>
  )
};

export default Home;
