import styled from 'styled-components';

export default function Header() {
  return (
    <HeaderSection>
      <Logo
        src={`${process.env.PUBLIC_URL}/images/logo_fixed.png`}
        alt='logo'
      />
    </HeaderSection>
  );
}

const HeaderSection = styled.header`
  padding: 20px 50px;
  border-bottom: 1px solid #e0e0e0;
`;
const Logo = styled.img``;
