export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface PaginationRequest {
  page: number;
  size: number;
  sort?: string; // optionnel
}
