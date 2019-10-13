import React from 'react';
import TechList from '../TechList';
import styled from 'styled-components';
import layout from '../../d3/word_cloud';
import { deleteItemFromList } from '../../function.helper';
import { CenterContainerCol, StyledAnimateCurrentTech } from '../commons/styles';
import { PoseGroup } from 'react-pose';
import { useWindowSize, downloadSVG } from '../../helper';
import { useSelector } from 'react-redux';
import { getConfirmedTech } from '../../redux/selectors/radar.selector';

const WordCloudPage = () => {
  const confirmedTech = useSelector((state) => getConfirmedTech(state));
  const { width, height } = useWindowSize();

  const [wordCloudList, setWordCloudList] = React.useState([]);
  const cloudRef = React.useRef();

  const handlePickTech = (tech) => {
    if (wordCloudList.indexOf(tech) !== -1) {
      setWordCloudList(deleteItemFromList(wordCloudList, tech));
    } else {
      setWordCloudList([...wordCloudList, tech]);
    }
  };

  const getWordCloudName = React.useMemo(() => {
    let list = wordCloudList.map((tech) => tech.name);
    return [...new Set(list)];
  }, [wordCloudList]);

  const regenerateCloud = React.useCallback(() => {
    const radarParent = cloudRef.current;

    while (radarParent && radarParent.firstChild) {
      radarParent.firstChild && radarParent.removeChild(radarParent.firstChild);
    }
    layout(getWordCloudName, width / 1.5, height / 1.5).start();
  }, [getWordCloudName, cloudRef, width, height]);

  React.useEffect(() => {
    regenerateCloud();
  }, [wordCloudList, regenerateCloud]);

  return (
    <ManageRadarWrapper>
      <TechList
        headerText={'Technology Overview'}
        handleClick={handlePickTech}
        multiList={wordCloudList}
        description={
          'If you update technology here, they will be submitted to an administrator and become unconfirmed. This means it is removed from the radar until an administrator confirms.'
        }
        techList={confirmedTech}
      />

      <CenterContainerCol>
        <PoseGroup animateOnMount={true} preEnterPose="preEnter">
          <StyledAnimateCurrentTech key="cloud">
            <h1>Word Cloud</h1>
            <p>
              By selecting technology in the list to the left you can create a word cloud based on
              that technology, then download it as a SVG file
            </p>

            <ButtonBar>
              <WhiteButton onClick={regenerateCloud}>Generate New</WhiteButton>
              <WhiteButton onClick={() => setWordCloudList([])}>Clear</WhiteButton>
              <WhiteButton onClick={() => setWordCloudList(confirmedTech)}>Select All</WhiteButton>
              <WhiteButton onClick={() => downloadSVG('word_cloud', 'techradar-wordcloud.svg')}>
                Download
              </WhiteButton>
            </ButtonBar>
            <StyledSvg key="svg" ref={cloudRef} id="word_cloud" />
          </StyledAnimateCurrentTech>
        </PoseGroup>
      </CenterContainerCol>
    </ManageRadarWrapper>
  );
};

export default React.memo(WordCloudPage);

const ManageRadarWrapper = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const ButtonBar = styled.div`
  display: flex;
  margin: 1em 0;
`;
export const WhiteButton = styled.button`
  padding: 8px 12px;
  border-radius: 3px;
  font-weight: 600;
  margin-right: 5px;
  color: ${(props) => props.theme.default.primaryColor};
  background: ${(props) => props.theme.default.lightColor};
  border: none;
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.default.lightColor};
    background: ${(props) => props.theme.default.primaryColor};
  }
`;

const StyledSvg = styled.svg`
  background: ${(props) => props.theme.default.lightColor};

  @media (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
    max-height: 50vh;
  }
`;
