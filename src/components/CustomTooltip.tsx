import styled from 'styled-components';

import { ITooltip } from '../types/types';

const CustomToolTip = ({ active, payload }: ITooltip) => {
  if (active && payload) {
    return (
      <StContainer>
        <div>{payload[0].payload.id}</div>
        <div>value_area: {payload[0].payload.value_area}</div>
        <div>value_bar: {payload[0].payload.value_bar}</div>
      </StContainer>
    );
  }
  return null;
};
export default CustomToolTip;

const StContainer = styled.div`
  background-color: #cce1ff;
  width: 150px;
  border-radius: 10px;
`;
