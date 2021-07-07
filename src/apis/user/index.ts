import { apiClient } from '../clients';
import { LoginReqType, JoinReqType } from '@type-definition/user';

export const userApis = {
  async login(payload:LoginReqType) {
    const { data } = await apiClient.post('/auth', payload);
    return data;
  },
  async signin(payload:JoinReqType) {
    const { data } = await apiClient.post('/sign-up', payload);
    return data;
  },
  async userMe(){
    const {data} = await apiClient.get('/user/me');
    return data;
  },
  async checkNicknameDupl(payload: {}){

  }
};
