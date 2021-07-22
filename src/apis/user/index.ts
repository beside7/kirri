import { apiClient } from '../clients';
import { LoginReqType, JoinReqType, EditUserMeResType, PushUpdateResType } from '@type-definition/user';

export const userApis = {
  async login(payload:LoginReqType) {
    try{
      const { data } = await apiClient.post('/auth', payload);
      return data;
    }catch(error){
      
    }
  },
  async signin(payload:JoinReqType) {
    try{
      const { data } = await apiClient.post('/sign-up', payload);
      return data;
    }catch(error){

    }
  },
  async userMe(){
    try{
      const {data} = await apiClient.get('/user/me');
      return data;
    }catch(error){

    }
  },
  async updateUserMe(payload: UpdateUserMeResType){
    try{
      const {data} = await apiClient.put('/user/me', payload);
      return data;
    }catch(error){

    }
  },
  async deleteUserMe(){
    try{
      const {data} = await apiClient.delete('/user/me');
      return data;
    }catch(error){
    }
  },
  async recentRecords () {
    try{
      const {data} = await apiClient.get('/user/me/recent-records');
      return data;
    }catch(error){

    }
  },
  async checkNicknameDupl(nickname: string){
    try{
      const {data} = await apiClient.get(`/exists/users/${nickname}`);
      return data;
    }catch(error){

    }
  },
  async pushUpdate(payload:PushUpdateResType) {
    try{
      const {data} = await apiClient.put('/user/me/push-settings');
      return true;
    }catch(error){
      return false;
    }
  }
};
