import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

export async function getAddressByZipCode(zipCode: string) {
  const response = await api.get(`/ws/${zipCode}/json`);
  return response.data;
}
