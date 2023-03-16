import React from 'react';
import styled from 'styled-components';

function Logo() {
  return <StyledLogo>Flexsys</StyledLogo>;
}

export default React.memo(Logo);

const StyledLogo = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  font-style: italic;
  user-select: none;
`;
