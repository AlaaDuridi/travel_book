import axios, { AxiosResponse } from 'axios';
import { BACKEND_HOST } from '../../constants/common.constants.ts';
import { IRoom } from '../../types/models/room.model.ts';

const INDEX = `${BACKEND_HOST}/api/rooms`;

export const updateRoom = async (room: IRoom): Promise<AxiosResponse> => {
  const response = await axios.put(`${INDEX}/${room.id}`, room);
  console.log('response of the update room is ', response, ' and we return its data');
  return response.data;
};
export const getRoom = async (roomId: number): Promise<IRoom> => {
  const response = await axios.get(`${INDEX}/${roomId}`);
  return response.data;
};
