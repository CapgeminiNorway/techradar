import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';
import { stylesTheme } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTech, toggleRadar, deleteRadar, silentlyConfirmTech } from '../redux/actions/radar.action';
import Icon, { ICON_TYPES } from '../assets/icons/IconComponent';
import { motion } from "framer-motion"
import SortBar from './SortBar';
import { useWindowSize } from '../custom-hooks';
import { ReactComponent as ChevronUpSvg } from "../assets/chevron-up.svg";
import { getUnconfirmedTech, getConfirmedTech } from '../redux/selectors/radar.selector';

function TechList({ handleClick, multiList }) {
  const dispatch = useDispatch();
  const { currentRadarList, allRadars } = useSelector((state) => state.radar);
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser && currentUser.isAdmin;
  const [debounceTech, setDebounceTech] = useState(null);
  const [tech] = useDebounce(debounceTech, 100);
  const windowSize = useWindowSize();
  const unconfirmedTech = useSelector(state => getUnconfirmedTech(state));
  const confirmedTech = useSelector(state => getConfirmedTech(state));


  const techListAnim = {
    hidden: {
      x: windowSize.isMobile ? 0 : 0,
      y: windowSize.isMobile ? "100%" : 0,
      transition: {
        when: "afterChildren",
      },
    },
    visible: {
      x: 0,
      y: 0,
      transition: {
        when: "beforeChildren",
        duration: 1,
        ease: "easeOut",
        delay: 1
      },
    },
  }

  const dispatchConfirmAll = () => dispatch(silentlyConfirmTech(unconfirmedTech));

  useEffect(() => {
    dispatch(setCurrentTech(tech));
  }, [tech, dispatch]);

  const getIsCurrentRadar = (radar, i) => {
    return currentRadarList.indexOf(radar) !== -1;
  };

  const renderRadarList = (_radarList) => {
    if (!_radarList || !_radarList.length) {
      return <TechListItem>No radars added</TechListItem>;
    }
    return _radarList.map((radar, i) => {
      if (!radar) return null;
      return (
        <TechListItem
          key={radar.id}
          focusable
          color={stylesTheme.default.lightColor}
          backgroundColor={stylesTheme.default.opaqueWhite}
          tabIndex={0}
          current={getIsCurrentRadar(radar, i)}
          onClick={() => dispatch(toggleRadar(radar))}>
          {radar.isPublic && (
            <span role="img" aria-label={'star'}>
              🌟
            </span>
          )}
          {radar.id.replace(/-/g, ' ')}
          {isAdmin && (
            <DeleteButton title="delete radar" onClick={() => dispatch(deleteRadar(radar))}>
              <Icon type={ICON_TYPES.CLOSE} stroke={'#fff'} marginRight />
            </DeleteButton>
          )}
        </TechListItem>
      );
    });
  };

  const [fullSize, toggleFullsize] = React.useState(false);
  const [hideRadars, toggleHideRadars] = React.useState(false);
  const [hideConfimed, toggleHideConfirmed] = React.useState(false);
  const [hideUnconfirmed, toggleHideUnconfirmed] = React.useState(false);
  return (
    <StyledTechList fullSize={fullSize} tabIndex={0} initial="hidden"
      animate="visible" variants={techListAnim}
    >
      {windowSize.width < 768 &&
        <ToggleHeight fullSize={fullSize} onClick={() => toggleFullsize(!fullSize)}>
          <ChevronUpSvg />
        </ToggleHeight>}

      <h5 onClick={() => toggleHideRadars(!hideRadars)}>All radars:</h5>
      {!hideRadars && <TechListWrapper>
        {renderRadarList(allRadars)}
      </TechListWrapper>}

      <h5  onClick={() => toggleHideConfirmed(!hideConfimed)}>Confirmed Tech ({confirmedTech.length}):</h5>
      { !hideConfimed && <TechListWrapper>
        {
          !!confirmedTech.length ?
            <>
              <SortBar
                list={confirmedTech}
                multiList={multiList}
                handleClick={handleClick}
                setDebounceTech={setDebounceTech}
              />
            </>

            :
            <TechListItem>No technology in selected radars</TechListItem>
        }

      </TechListWrapper>
      }


      <h5  onClick={() => toggleHideUnconfirmed(!hideUnconfirmed)}>Unconfirmed Tech ({unconfirmedTech.length}):</h5>

      { !hideUnconfirmed && <TechListWrapper>
        {
          !!unconfirmedTech.length ?
            <>
              

              <SortBar
                list={unconfirmedTech}
                multiList={multiList}
                handleClick={handleClick}
                setDebounceTech={setDebounceTech}
              />
              {!!(currentUser && currentUser.isAdmin) &&
                <ConfirmAllWrapper>
                  <button onClick={dispatchConfirmAll}>Confirm all technology</button>
                </ConfirmAllWrapper>
              }
            </>
            :
            <TechListItem>No technology in selected radars</TechListItem>
        }
      </TechListWrapper>
      }
    </StyledTechList>
  );
}

export default TechList;


const StyledTechList = styled(motion.ol)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: ${(props) => props.theme.default.primaryColor};
  min-width: 20em;
  max-width: 20em;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  position: relative;
  z-index: 100;

  h5 {
    margin: .5em;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    min-width: 100vw;
    max-width: 100vw;
    padding: 1em .5em;
    padding-bottom: 5em;
    transition: min-height 500ms ease-out, max-height 500ms ease-out;

    ${ props => props.fullSize ? `
    
    min-height: 100vh;
    max-height: 100vh;
    ` : `
    
    min-height: 45vh;
    max-height: 45vh;
    `};
  }
`;

const ToggleHeight = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    ${props => props.fullSize && `
      transform: rotate(180deg);
    `};
    width: 10px;
    height: 10px;
  }
`;
const ConfirmAllWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 10px;
margin: 10px 0;

button {
  background: none;
  color: white;
  font-weight: 600;
  text-decoration: underline;
  :hover {
    background: white;
  }
}

`;
const TechListWrapper = styled.div`
  margin-bottom: 1em;
`;
const DeleteButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 2%;
  top: calc(50% - 8px);
  width: 16px;
  height: 16px;
  color: white;
  background: red;
  border-radius: 50%;
`;

export const TechListItem = styled.li`
  position: relative;
  padding: .5em 2em .5em .5em;
  text-align: left;
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  list-style: none;
  cursor: pointer;

  ${(props) =>
    props.current && {
      background: props.theme.default.lightColor,
      color: props.theme.default.primaryColor,
    }}
`;
