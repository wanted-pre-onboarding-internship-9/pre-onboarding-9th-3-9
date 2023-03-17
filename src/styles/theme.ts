import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  color: {
    white: '#fff',
    black: '#000',
  },
  bg: {
    gradient_1: '#084464',
    gradient_2: '#000101',
    gradient_3: '#433abe',
  },
  rgba: {
    blue_default: 'rgba(23, 70, 162, 0.2)',
    blue_active: 'rgba(23, 70, 162, 0.9)',
    green_default: 'rgba(64,192,36 ,0.2)',
    green_active: 'rgba(64,192,36 ,0.9)',
  },
} as const;
export { theme };
