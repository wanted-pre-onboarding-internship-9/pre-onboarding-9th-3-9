import { useSearchParams } from 'react-router-dom';

type searchParam = {
  searchParamName: string;
  defaultValue?: string;
};

export function useSearchParamsState({
  searchParamName,
  defaultValue = '',
}: searchParam) {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParam = searchParams.get(searchParamName);
  const searchParamsState: string = searchParam ?? defaultValue;

  const setSearchParamsState = (newState: string) =>
    setSearchParams({ [searchParamName]: newState });

  return { searchParamsState, setSearchParamsState } as const;
}
