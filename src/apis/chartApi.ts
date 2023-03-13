import { IChartNestedObjects } from '../types/chartTypes';
import instance from './instance';

export const getChartApi = async (): Promise<IChartNestedObjects> => {
  const response = await instance.get('');
  return response.data.response;
};
