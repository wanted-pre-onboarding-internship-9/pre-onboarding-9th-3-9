import { createContext } from 'react';

import { ResponseDataType } from '../common/Types';

export const ContextAPI = createContext<ResponseDataType[]>([]);
