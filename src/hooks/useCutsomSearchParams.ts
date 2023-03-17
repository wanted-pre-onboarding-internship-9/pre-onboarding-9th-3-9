import { useSearchParams } from 'react-router-dom';

function useCustomSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  return [searchParams, setSearchParams];
}
export default useCustomSearchParams;
