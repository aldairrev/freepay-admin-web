export default interface Pagination {
  from: number,
  prev?: number,
  next?: number,
  to?: number,
  per_page: number,
  current: number,
  total?: number
}
