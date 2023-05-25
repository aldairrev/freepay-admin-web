import Pedido from "../Pedido";
import Pagination from "./Pagination";

export default interface PaginationPedido extends Pagination {
  data: Pedido[],
}
