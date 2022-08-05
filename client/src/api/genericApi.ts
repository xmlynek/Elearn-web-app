import { AxiosInstance } from "axios";

export const getAll = async <T>(customAxios: AxiosInstance): Promise<T[]> => {
  const response = await customAxios.get("");
  return response.data;
};

export const save = async <T>(
  customAxios: AxiosInstance,
  body: T
): Promise<T> => {
  const response = await customAxios.post(``, body);
  return response.data;
};

export const getById = async <T>(
  customAxios: AxiosInstance,
  id: number
): Promise<T> => {
  const response = await customAxios.get(`/${id}`);
  return response.data;
};

export const patch = async <T>(
  customAxios: AxiosInstance,
  id: number,
  body: T
): Promise<T> => {
  const response = await customAxios.patch(`/${id}`, body);
  return response.data;
};

export const update = async <T>(
  customAxios: AxiosInstance,
  id: number,
  body: T
): Promise<T> => {
  const response = await customAxios.put(`/${id}`, body);
  return response.data;
};

export const remove = async <T>(
  customAxios: AxiosInstance,
  id: number
): Promise<T> => {
  const response = await customAxios.delete(`/${id}`);
  return response.data;
};
