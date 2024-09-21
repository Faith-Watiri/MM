import {Method} from 'axios';
export {};

declare global {
  type AxiosConfig = {
    bearerToken?: string;
    url: string;
    method: Method;
    data: object;
  };
}
