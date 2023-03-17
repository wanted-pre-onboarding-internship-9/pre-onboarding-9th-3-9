import styled from 'styled-components';

const Tooltip = ({ data }: PropsType) => {
  return (
    <StTooltipContainer>
      <StUl>
        <StLi>id: {data.valueId}</StLi>
        <StLi>value_area: {data.valueArea}</StLi>
        <StLi>value_bar: {data.valueBar}</StLi>
      </StUl>
    </StTooltipContainer>
  );
};

type PropsType = {
  data: {
    valueId: string;
    valueArea: number;
    valueBar: number;
  };
};

export default Tooltip;

const StLi = styled.li`
  list-style: none;
`;

const StUl = styled.ul`
  list-style: none;
  padding: 0px;
`;

const StTooltipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 10px;
`;
