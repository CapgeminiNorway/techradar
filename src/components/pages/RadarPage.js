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
    <RadarPageWrapper>
      <TechList />
      <Radar currentRadarList={currentRadarList} techList={confirmedTech} />
    </RadarPageWrapper>
  );
};

export default RadarPage;

const RadarPageWrapper = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column-reverse;

    #radarParent,
    #radar {
      width: 100vw;
      margin-bottom: 2em;
    }
  }
`;
