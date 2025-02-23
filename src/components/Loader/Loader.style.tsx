import styled from 'styled-components';

interface IBackDropModalShadowProps {
  $isOpen: boolean;
}

export const BackDropShadow = styled.div<IBackDropModalShadowProps>`
  display: flex;
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100%;
  margin: 0px;
  top: 0;
  left: 0;
  z-index: 9999;
  transition: opacity 0.3s ease-in;
  background: "white10";
  backdrop-filter: blur(5px);
`;