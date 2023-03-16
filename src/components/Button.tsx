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
  border: 1px solid #fff;
  border-radius: 15px;
  padding: 10px 20px;
  transition: all 0.3s;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;
