import React from 'react';
import Radar from '../Radar';
import TechList from '../TechList';
import styled from 'styled-components';
import { getConfirmedTech } from '../../redux/selectors/radar.selector';
import { useSelector } from 'react-redux';

const RadarPage = () => {
  const confirmedTech = useSelector((state) => getConfirmedTech(state));
  const { currentRadarList } = useSelector((state) => state.radar);

  return (
    <PageWrapper  initial="hidden"
                  animate="visible">
      <TechList/>
      <Wrapper>
        <Radar currentRadarList={currentRadarList} techList={confirmedTech} />
      </Wrapper>
    </PageWrapper>
  );
};

export default RadarPage;

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 3em 2em;
@media (max-width: 768px) {
    align-items: center;
    justify-content: center;
    padding: 1em 0;
}
`;
export const PageWrapper = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: row;
  height: 100%;
  justify-content: space-between;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;

    #radarParent,
    #radar {
      width: 100vw;
      height: 100%;
    }
  }
`;
