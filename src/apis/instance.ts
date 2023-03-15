import axios from 'axios';

const baseURL = '/mock/mock_data.json';

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;

// 차트 데이터
export const chartApi = () => instance.get('');
