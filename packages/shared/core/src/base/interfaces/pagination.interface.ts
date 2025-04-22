export interface IPagination {
  size?: number;
  page: number;
  sort?: [];
  direction?: "asc" | "desc";
  linesPerPage?: number;
  orderBy?: number;
}
