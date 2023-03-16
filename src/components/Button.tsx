import styled from 'styled-components';

import { IButtonProps } from '../types';

function Button({ text, onClick, isActivated }: IButtonProps) {
  return (
    <StyledButton onClick={onClick} isActivated={isActivated}>
      {text}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button<{ isActivated: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: white;

  background: ${props => (props.isActivated ? '#ff000080' : '#1f5395')};
  border: none;
  border-radius: 15px;
  padding: 10px 20px;

  transition: all 0.3s;

  cursor: pointer;

  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;
