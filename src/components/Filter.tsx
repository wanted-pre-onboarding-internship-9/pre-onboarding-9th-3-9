import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from 'styled-components';

import { useSearchParamsState } from '../hooks/useParams';

type FilterProps = {
  districts: string[];
};

export default function Filter({ districts = [] }: FilterProps) {
  const { searchParamsState, setSearchParamsState } = useSearchParamsState({
    searchParamName: 'id',
    defaultValue: '전체',
  });

  const handleChange = (event: SelectChangeEvent) =>
    setSearchParamsState(event.target.value);

  return (
    <Base>
      <Label>지역구 :</Label>
      <FilterBody>
        {districts && searchParamsState && (
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={searchParamsState}
              onChange={handleChange}
              displayEmpty>
              {districts.map((name, idx) => (
                <MenuItem key={idx} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </FilterBody>
    </Base>
  );
}

const Base = styled.div`
  width: 190px;
  height: 75px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Label = styled.p`
  line-height: 75px;
  margin: 0;
`;
const FilterBody = styled.div``;
