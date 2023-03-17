import styled from 'styled-components';

import { useSearchParamsState } from '../hooks/useSearchParamsState';
import Button from './ui/Button';

type FilterProps = {
  districtValues: string[];
};

export default function Filter({ districtValues }: FilterProps) {
  const { searchParamsState, setSearchParamsState } = useSearchParamsState({
    searchParamName: 'id',
    defaultValue: '전체',
  });

  return (
    <Base>
      <FilterBody>
        {districtValues.map(name => (
          <Button
            key={name}
            text={name}
            isActivated={searchParamsState === name}
            onClick={() => setSearchParamsState(name)}
          />
        ))}
      </FilterBody>
    </Base>
  );
}

const Base = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 30px auto;
`;
const FilterBody = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
`;
