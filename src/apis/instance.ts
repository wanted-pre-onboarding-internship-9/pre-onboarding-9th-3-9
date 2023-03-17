import axios from 'axios';

const baseURL = '/mock/mock_data.json';

export const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getData = () => instance.get('');
