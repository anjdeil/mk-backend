export type OrderDirection = 'ASC' | 'DESC';

export type ModelQuery<TFilter = any> = {
  limit?: string;
  offset?: string;
  order?: {
    field: string;
    direction: OrderDirection;
    relevance?: string;
  };
  search?: {
    fields: string[] | string;
    value: string;
  };
  filters?: TFilter;
};
