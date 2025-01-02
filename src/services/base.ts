export interface Pagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
  links: {
    previous: string | null;
    current: string;
    next: string | null;
  };
}

export interface Meta {
  pagination: Pagination;
}

export interface Response<TData = unknown> {
  meta: Meta | null;
  data: TData;
}
