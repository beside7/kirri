import { apiClient } from '../clients';
import { LoginReqType, JoinReqType } from 'types/user';

export const userApis = {
  async login(payload:LoginReqType) {
    const { data } = await apiClient.post('/auth', payload);
    return data;
  },
  async join(payload:JoinReqType) {
    const { data } = await apiClient.post('/user/join', payload);
    return data;
  }
};
