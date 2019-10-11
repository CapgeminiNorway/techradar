import React, { useRef, useEffect, memo } from 'react';
import styled from 'styled-components';
import { radar_visualization } from '../d3/radar_visualization';
import { QUADRANTS } from '../App';
import { stylesTheme } from '../index';
import { getQuadrant, getRing, getMovedStatus, convertJsonToExcel } from '../function.helper';
import * as d3 from 'd3';
import { withRouter } from 'react-router-dom';
import { downloadSVG } from '../helper';
import { WhiteButton } from './pages/GenerateWordCloud';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTech } from '../redux/actions/radar.action';
import { toggleUserWarning } from '../redux/actions/gui.action';
import { StyledAnimateCurrentTech } from './commons/styles';
import { PoseGroup } from 'react-pose';

function Radar({ publicPage, techList, history }) {
  const { currentRadarList } = useSelector((state) => state.radar);
  const dispatch = useDispatch();

  const radarRef = useRef();
  const radarWidth = 1450;
  const radarHeight = 1000;

  useEffect(() => {
    d3.select(window).on('resize', function() {
      setSize();
    });
  }, []);

  function setSize() {
    const aspect = radarWidth / radarHeight,
      chart = d3.select('#radar'),
      container = d3.select('#radarParent');

    if (container && container.node()) {
      var targetWidth = container.node().getBoundingClientRect().width - 100;
      chart.attr('width', targetWidth);
      chart.attr('height', Math.round(targetWidth / aspect));
    }
  }

  const handleBubbleClick = React.useCallback(
    (bubble) => {
      history.push('/manage-tech');
      dispatch(setCurrentTech(bubble));
    },
    [history, dispatch],
  );

  const updateRadar = React.useCallback(() => {
    const entries = techList.map((tech) => {
      return {
        ...tech,
        label: tech.name,
        quadrant: getQuadrant(tech.quadrant),
        quadrantString: tech.quadrant,
        ring: getRing(tech.ring),
        ringString: tech.ring,
        moved: getMovedStatus(tech.moved),
      };
    });

    radar_visualization({
      svg_id: 'radar',
      width: radarWidth,
      height: radarHeight,
      textColor: stylesTheme.default.lightColor,
      ringText: 'rgba(255,255,255,0.5)',
      colors: {
        background: '#282c34',
        grid: '#bbb',
        inactive: '#ddd',
      },
      title: '',
      quadrants: QUADRANTS,
      rings: [{ name: 'Adopt' }, { name: 'Trial' }, { name: 'Assess' }, { name: 'Hold' }],
      print_layout: true,
      entries: entries,
      //zoomed_quadrant: 0,
      handleBubbleClick: handleBubbleClick,
    });
    setSize();
  }, [techList, handleBubbleClick]);

  useEffect(() => {
    const radarParent = radarRef.current;

    while (radarParent && radarParent.firstChild) {
      radarParent.removeChild(radarParent.firstChild);
    }
    updateRadar();
  }, [techList, updateRadar, radarRef]);

  const downloadRadarSvg = () => {
    if (!currentRadarList.length) {
      dispatch(toggleUserWarning('Pick a radar with technology to download'));
    } else {
      downloadSVG('radar', `${currentRadarList[0].id}-Radar.svg`);
    }
  };

  const downloadCSV = () => {
    if (!currentRadarList.length) {
      dispatch(toggleUserWarning('Pick a radar with technology to download'));
    } else {
      convertJsonToExcel(techList, currentRadarList[0].id);
    }
  };

  return (
    <>
      <TechRadarWrapper id="radarParent" publicPage={!!publicPage}>
        <PoseGroup animateOnMount preEnterPose="preEnter">
          <StyledAnimateCurrentTech key="radar">
            {!publicPage && (
              <TextWrapper>
                <h1>Radar</h1>
                <p>
                  The radar is a result of which radars you have selected to the left list. When you
                  are satisfied with the result, you can download SVG or Excel here.
                </p>
                <WhiteButton onClick={downloadRadarSvg}>Download Radar SVG</WhiteButton>
                <WhiteButton onClick={downloadCSV}>Download Excel (.csv)</WhiteButton>
              </TextWrapper>
            )}

            <svg
              ref={radarRef}
              id="radar"
              width={radarWidth}
              height={radarHeight}
              viewBox={`0 0 ${radarWidth} ${radarHeight}`}
              perserveaspectratio="xMinYMid"
            />
          </StyledAnimateCurrentTech>
        </PoseGroup>
      </TechRadarWrapper>
    </>
  );
}

export default withRouter(memo(Radar));

const TextWrapper = styled.div`
  padding: 1em;
`;

const TechRadarWrapper = styled.div`
  width: ${(props) => (props.publicPage ? '100vw' : '80vw')};
`;
