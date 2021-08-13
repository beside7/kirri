import { apiClient } from '../clients';
import { LoginReqType, JoinReqType, UpdateUserMeResType, PushUpdateResType, TermsResType, RecentRecordResType } from '@type-definition/user';

export const userApis = {
  async login(payload:LoginReqType) {
    try{
      const { data } = await apiClient.post('/auth', payload);
      return data;
    }catch(error){
      throw new Error("");
      
      
    }
  },
  async signin(payload:JoinReqType) {
    try{
      const { data } = await apiClient.post('/sign-up', payload);
      return data;
    }catch(error){
      throw new Error("");
      
      console.log(error)
    }
  },
  async userMe(){
    try{
      const {data} = await apiClient.get('/user/me');
      return data;
    }catch(error){
      throw new Error("");
      

    }
  },
  async updateUserMe(payload: UpdateUserMeResType){
    try{
      const {data} = await apiClient.put('/user/me', payload);
      return data;
    }catch(error){
      throw new Error("");
      

    }
  },
  async deleteUserMe(){
    try{
      const result = await apiClient.delete('/user/me');
      return result;
    }catch(error){
      console.log(error);
      throw new Error("");
    }
  },
  /**
   * 최근 기록을 조회한다.
   * @returns 
   */
   async recentRecords() : Promise<RecentRecordResType> {
    const { data } = await apiClient.get(`/recent-records`);
    return data;
  },
  async checkNicknameDupl(nickname: string){
    try{
      const {data} = await apiClient.get(`/exists/users/${nickname}`);
      return data;
    }catch(error){
      throw new Error("");
      

    }
  },
  async pushUpdate(payload:PushUpdateResType) {
    try{
      const {data} = await apiClient.put('/user/me/push-settings');
      return true;
    }catch(error){
      throw new Error("");
      
      return false;
    }
  },
  async refuseInvitationDiary (uuid: string) {
    try{
      const result = await apiClient.delete(`/user/me/diaries/${uuid}`);
      return result;
    }catch(error){
      throw new Error("");
      

    }
  },
  async acceptInvitationDiary (uuid: string) {
    try{
      const result = await apiClient.post(`/user/me/diaries/${uuid}`);
      return result;
    }catch(error){
      throw new Error("");
      

    }
  },
  /**
   * 푸시 디바이스 등록
   * @param token 디바이스 토큰값
   * @returns 
   */
  async addPushDevice(token: string){
    const result = await apiClient.post(`/user/me/devices`, {
      token
    });
    return result;
  },

  /**
   * 알림설정
   * @param payload 
   * @returns 
   */
  async updatePush(payload : {CHEERING: boolean, NEW_RECORD: boolean, NOTIFICATION: boolean, INVITATION: boolean}){
    const req = Object.entries(payload).map(([type , active] , index) => ({
      type, active
    }))
    // console.log(req);
    
    const result = await apiClient.put(`/user/me/push-settings`, req)
    return result;
  },
  async getTerms ():Promise<TermsResType[]|undefined> {
    try {
      const {data} = await apiClient.get('/terms-of-services');
      return data;
    } catch(error) {

    }
  }
};
