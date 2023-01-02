import {AxiosResponse} from 'axios';
import {ICheckIn} from 'interfaces/ICheckin';
import useAxios from '.';

interface ICheckInResponse {
  data: ICheckIn[];
}

export const get_checkIn_list = async (
  year: string,
  month: string,
): Promise<AxiosResponse<ICheckInResponse>> => {
  return await useAxios.get(`check-in?year=${year}&month=${month}`);
};
