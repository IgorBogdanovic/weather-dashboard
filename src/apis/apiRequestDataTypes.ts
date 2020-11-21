export interface GetRequestData {
  path: string;
  query?: object;
}

export interface PostRequestData {
  path: string;
  data: object;
  options?: object;
}

export interface PutRequestData {
  path: string;
  id: number;
  data: object;
  options?: object;
}

export interface DeleteRequestData {
  path: string;
  id: number;
  query?: object;
}
