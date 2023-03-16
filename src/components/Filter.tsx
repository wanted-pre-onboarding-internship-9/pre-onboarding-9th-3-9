import styled from 'styled-components';

import { useSearchParamsState } from '../hooks/useParams';
import Button from './Button';

type FilterProps = {
  districts: string[];
};

export default function Filter({ districts = [] }: FilterProps) {
  const { searchParamsState, setSearchParamsState } = useSearchParamsState({
    searchParamName: 'id',
    defaultValue: '전체',
  });

  return (
    <Base>
      <FilterBody>
        {districts.map(name => (
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
  margin: 10px auto 30px auto;
`;
const FilterBody = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
`;
