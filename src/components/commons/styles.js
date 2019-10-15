import styled from 'styled-components';
import { motion } from "framer-motion"

export const tabletWidth = 700;

export const DefaultSectionSpacing = styled.div`
  margin: 25px 0;
`;

export const DefaultRowSpacing = styled.div`
  margin: 0 1em;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Grow = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;
export const Padding = styled.div`
  padding: 1em;
`;

export const Row = styled.div`
  display: flex;
`;

export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const CenterContainerCol = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 1em;
  height: 95vh;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

`;
export const defaultDelay = 50,
  defaultDuration = 300;


export const StyledAnimateCurrentTech = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
`;
