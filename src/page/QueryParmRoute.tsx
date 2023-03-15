import React from 'react';
import { Navigate } from 'react-router-dom';

import { useSearchParamsState } from '../hooks/useParams';

type RouteProps = {
  children: React.ReactElement;
  require: string;
};

export default function QueryParmRoute({
  children,
  require,
}: RouteProps): React.ReactElement {
  const { searchParamsState } = useSearchParamsState({
    searchParamName: require,
  });
  if (require && searchParamsState === '') {
    return <Navigate to='/?id=전체' replace />;
  }

  return children;
}
