import React from 'react';
import Radar from '../Radar';
import TechList from '../TechList';
import styled from 'styled-components';
import { getConfirmedTech } from '../../redux/selectors/radar.selector';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion"

const RadarPage = () => {
  const confirmedTech = useSelector((state) => getConfirmedTech(state));
  const { currentRadarList } = useSelector((state) => state.radar);

  return (
    <PageWrapper  initial="hidden"
                  animate="visible">
      <TechList/>
      <Radar currentRadarList={currentRadarList} techList={confirmedTech} />
    </PageWrapper>
  );
};

export default RadarPage;

export const PageWrapper = styled(motion.div)`
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
    }
  }
`;
