import { CreateDiaryReqType } from './../../types/diary/index';
import { apiClient } from '../clients';
import { DiariesResType } from '@type-definition/diary';

export const diaryApis = {
  async getDiaries() : Promise<DiariesResType> {
    const { data } = await apiClient.get('/diaries');
    return data;
  },
  async createDiary(payload: CreateDiaryReqType) {
    const { data } = await apiClient.post('/diaries', payload);
    return data;
  }
};
