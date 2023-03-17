import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const FilterBtn = ({ btnName }: { btnName: string }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isSelected = btnName === id;

  return isSelected ? (
    <StSelectedBtn onClick={() => navigate(`/${btnName}`)}>
      {btnName}
    </StSelectedBtn>
  ) : (
    <StNotSelectedBtn onClick={() => navigate(`/${btnName}`)}>
      {btnName}
    </StNotSelectedBtn>
  );
};

export default FilterBtn;

const StSelectedBtn = styled.button`
  width: 65px;
  height: 30px;
  background-color: #7ac4fc;
  padding: 5px;
  border: 1px solid #7ac4fc;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`;

const StNotSelectedBtn = styled.button`
  width: 65px;
  height: 30px;
  background-color: white;
  padding: 5px;
  border: 1px solid #808080;
  color: #808080;
  border-radius: 4px;
  cursor: pointer;
`;
