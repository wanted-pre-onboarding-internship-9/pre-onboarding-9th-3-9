import instance from './instance';

export const getChartApi = async () => {
  const response = await instance.get('');
  return response.data.response;
};
