import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='text-white font-bold text-2xl'>
      No encontrado
      <Link to="/login">Regresar</Link>
    </div>
  )
};

export default NotFound;
