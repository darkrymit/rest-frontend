export interface Order {
  property: string;
  direction: 'ASC' | 'DESC';
}

export interface PageRequest {
  page: number;
  size: number;
  sort?: Order[];
}
