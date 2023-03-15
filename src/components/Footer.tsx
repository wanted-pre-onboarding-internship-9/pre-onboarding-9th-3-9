import styled from 'styled-components';

export default function Footer() {
  return (
    <HeaderSection>
      <Text>
        ⓒ 2023. flexsys and wanted pre onboarding internship 9th All rights
        reserved.
      </Text>
    </HeaderSection>
  );
}

const HeaderSection = styled.footer`
  width: 100%;
  background-color: #243c98;
  display: flex;
  justify-content: center;
  align-content: center;
`;
const Text = styled.p`
  color: #fff;
`;
