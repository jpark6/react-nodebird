import axios, { AxiosResponse } from 'axios';

export default function axiosRequest(uri: string, method: string, data: unknown): Promise<AxiosResponse<any>> {
  if(method && method.toUpperCase() === 'POST') {
    return axios.post(uri, data);
  } 
  return axios.get(uri);
}