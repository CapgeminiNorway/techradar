import styled from 'styled-components';
import posed from 'react-pose';

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

export const CenterContainerCol = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 1em;
  height: 95vh;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 768px) {
    height: unset;
  }
`;
export const defaultDelay = 50,
  defaultDuration = 300;

export const AnimateCurrentTech = posed.div({
  preEnter: {
    scale: 0,
    opacity: 0,
    transition: ({ currentLen }) => ({
      type: 'tween',
      duration: defaultDuration * currentLen,
      delay: currentLen * defaultDuration,
      easing: 'easeInOut',
    }),
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: defaultDuration * 2,
      delay: defaultDelay * 4,
      easing: 'easeInOut',
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    duration: defaultDuration,
    transition: 'tween',
    easing: 'easeInOut',
  },
});

export const StyledAnimateCurrentTech = styled(AnimateCurrentTech)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;
