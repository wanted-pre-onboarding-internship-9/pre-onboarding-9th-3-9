import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      [key: string]: string;
    };
    bg: {
      [key: string]: string;
    };
    rgba: {
      [key: string]: string;
    };
  }
}
