import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import Button from './ui/Button';

type FilterProps = {
  districtValues: string[];
};

export default function Filter({ districtValues }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get('id');

  return (
    <Base>
      <FilterBody>
        <Button
          text='전체'
          isActivated={!searchParam}
          onClick={() => setSearchParams()}
        />
        {districtValues.map(name => (
          <Button
            key={name}
            text={name}
            isActivated={searchParam === name}
            onClick={() => setSearchParams({ id: name })}
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
