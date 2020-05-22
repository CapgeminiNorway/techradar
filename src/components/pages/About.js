import React from 'react';
import {
  GeneralRadarExplanation,
  IntroductionInformation,
  RadarExplanationInformation,
} from '../_InfoComponents';
import styled from 'styled-components';

const About = () => {
  return (
    <Wrapper>
      <h1>What is a Tech Radar?</h1>
      <div>
        <GeneralRadarExplanation />
        <RadarExplanationInformation />
      </div>
      <IntroductionInformation />
    </Wrapper>
  );
};

export default About;

export const Wrapper = styled.div`
  width: 100%;

  p {
    font-size: 1em;
  }

  h3 {
    margin: 1em 0;
  }
`;
