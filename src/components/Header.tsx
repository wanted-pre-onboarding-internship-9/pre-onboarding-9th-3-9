import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../assets/images/logo.png';

const Header = () => {
  return (
    <STHeaderWrap>
      <StItemWrap>
        <Link to='/'>
          <img src={logo} alt='logo' />
        </Link>
      </StItemWrap>
    </STHeaderWrap>
  );
};

export default Header;

const STHeaderWrap = styled.div`
  display: flex;
  width: 100%;
  height: 6%;
  background-color: #0d9df2;
`;
const StItemWrap = styled.div`
  margin-left: 0.5%;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 1px;
  img {
    width: 90%;
  }
`;
