import { CreateDiaryReqType, DiariesResType, RecordsResType, CreateRecordReqType } from './../../types/diary/index';
import { apiClient } from '../clients';

export const diaryApis = {
  async getDiaries() : Promise<DiariesResType> {
    const { data } = await apiClient.get('/diaries');
    return data;
  },
  async createDiary(payload: CreateDiaryReqType) {
    const { data } = await apiClient.post('/diaries', payload);
    return data;
  },

  /**
   * 다이러리 멤버 조회
   * @param uuid 다이러리기본키 
   * @param nickname 닉네임
   * @returns 
   */
  async findMember(uuid : string, nickname : string) {
    const { data } = await apiClient.get(`/diaries/${uuid}/members` , {
      params: {
        'nickname' : nickname
      }
    });
    return data;
  }
};

/**
 * 기록에 관한 API
 */
export const recodeApis = {
  /**
   * 기록을 가져온다
   * @param uuid 다이러리 기본키
   * @returns 
   */
  async getRecords( uuid : string ) : Promise<RecordsResType> {
    const { data } = await apiClient.get(`/diaries/${uuid}/records`);
    return data;
  },
  
  /**
   * 기록을 저장한다
   * @param uuid 다이러리 기본키
   * @param payload 입력 값
   * @returns 
   */
  async createRecord( uuid: string ,payload: CreateRecordReqType) {
    const { data } = await apiClient.post(`/diaries/${uuid}/records`, payload);
    return data;
  }
}