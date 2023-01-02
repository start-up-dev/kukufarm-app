import {AxiosResponse} from 'axios';
import {ICircle} from 'interfaces/ICircle';
import useAxios from '.';

interface ICircleResponse {
  circles: ICircle[];
}

export const get_my_circles = async (): Promise<
  AxiosResponse<ICircleResponse>
> => {
  return await useAxios.get(`circle/my-circle`);
};

export const create_circle = async (payload: {
  name: string;
}): Promise<AxiosResponse<any>> => {
  return await useAxios.post(`circle/create`, payload);
};

export const update_circle = async (
  circleId: string,
  payload: {
    name: string;
  },
): Promise<AxiosResponse<any>> => {
  return await useAxios.patch(`circle/${circleId}/update`, payload);
};

export const delete_circle = async (
  circleId: string,
): Promise<AxiosResponse<any>> => {
  return await useAxios.delete(`circle/${circleId}`);
};

export const add_member_in_circle = async (
  circleId: string,
  payload: any,
): Promise<AxiosResponse<any>> => {
  return await useAxios.post(`circle/${circleId}/add-member`, payload);
};

export const remove_member_in_circle = async (
  circleId: string,
  payload: any,
): Promise<AxiosResponse<any>> => {
  return await useAxios.delete(`circle/${circleId}/remove-member`, {
    data: payload,
  });
};
