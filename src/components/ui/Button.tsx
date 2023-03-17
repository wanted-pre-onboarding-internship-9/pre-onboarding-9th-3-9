import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
  text: string;
  children?: React.ReactElement;
  isActivated: boolean;
  onClick: () => void;
};

export default function Button(props: ButtonProps) {
  const { text, children, onClick, isActivated } = props;
  return (
    <StyledButton onClick={onClick} isActivated={isActivated}>
      {text ?? children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ isActivated: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: ${props => (props.isActivated ? '#1f5395' : 'none')};
  border: 1px solid ${props => props.theme.color.white};
  border-radius: 15px;
  padding: 10px 20px;
  transition: all 0.3s;
  cursor: pointer;
`;
