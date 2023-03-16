import styled from 'styled-components';

interface IButtonProps {
  text: string;
  isOn: boolean;
  onClick: () => void;
}

function Button({ text, onClick, isOn }: IButtonProps) {
  return (
    <StButton onClick={onClick} isOn={isOn}>
      {text}
    </StButton>
  );
}

export default Button;

const StButton = styled.button<{ isOn: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: ${props => (props.isOn ? '#0d9df2' : '#cde9fc')};
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  transition: all 0.3s;
  cursor: pointer;
`;
