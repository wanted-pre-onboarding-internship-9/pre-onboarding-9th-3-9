import React from 'react';
import styled from 'styled-components';

function Background() {
  return <StyledBackground />;
}

export default React.memo(Background);

const StyledBackground = styled.div`
  background: linear-gradient(-45deg, #084464, #000101, #433abe);
  background-size: 200% 200%;
  animation: move-background 20s ease-in-out infinite;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -1;

  @keyframes move-background {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
