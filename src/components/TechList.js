import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';
import { stylesTheme } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTech, toggleRadar, deleteRadar, silentlyConfirmTech } from '../redux/actions/radar.action';
import Icon, { ICON_TYPES } from '../assets/icons/IconComponent';
import { WhiteButton } from './pages/GenerateWordCloud';
import { motion } from "framer-motion"
import SortBar from './SortBar';
import { useWindowSize } from '../custom-hooks';
import { ReactComponent as ChevronUpSvg} from "../assets/chevron-up.svg";

export const techListAnim = {
    hidden: { 
      y: "100%",
      transition: {
        when: "afterChildren",
      },
    },
    visible: { 
      y: 0 ,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 1, 
        ease: "easeOut", 
        delay: 1
      },
    },
}

export const techItemAnim = {
  visible: i => ({
    opacity: 1, 
    x: 0, 
    transition: {
      when: "beforeChildren",
      duration: 1, 
      ease: "easeOut", 
      delay: 1 + i * 0.3
    },
  }),
  hidden: { 
    opacity: 0, 
    x: -100 
  },
}
export const opacityAnim = {
    visible: {
      opacity: 1, 
      transition: {
        duration: 1, 
        ease: "easeOut", 
        delay: 3
      },
    },
    hidden: { 
      opacity: 0, 
    },
}

function TechList({ handleClick, multiList }) {
  const dispatch = useDispatch();
  const { currentRadarList, allRadars, techList } = useSelector((state) => state.radar);
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser && currentUser.isAdmin;
  const [debounceTech, setDebounceTech] = useState(null);
  const [tech] = useDebounce(debounceTech, 100);
  const windowSize = useWindowSize();


  const [ unconfirmedTech, confirmedTech ] = React.useMemo( () => {
    let _unc = [], _c = [];
    techList.forEach( tech => {
      if (tech.confirmed) _c.push(tech);
      else _unc.push(tech);
    })
    return [_unc, _c];

  }, [techList]);

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
          variants={techItemAnim}
          custom={i}
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

  return (
    <StyledTechList fullSize={fullSize} tabIndex={0} initial="hidden"
    animate="visible" variants={techListAnim}
    >
      { windowSize.width < 768 && 
      <ToggleHeight fullSize={fullSize}  onClick={() => toggleFullsize(!fullSize)}>
        <ChevronUpSvg />
      </ToggleHeight>}
      <TechListWrapper>
        <h5>All radars:</h5> {renderRadarList(allRadars)}
      </TechListWrapper>
      <TechListWrapper>
        <h5>Confirmed Tech ({confirmedTech.length}):</h5>
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

      <TechListWrapper>
        <h5>Unconfirmed Tech ({unconfirmedTech.length}):</h5>
        {
          !!unconfirmedTech.length ?
            <>
              {!!(currentUser && currentUser.isAdmin) &&
                <ConfirmAllWrapper>
                  <WhiteButton onClick={dispatchConfirmAll}>Confirm all</WhiteButton>
                </ConfirmAllWrapper>
              }

              <SortBar
                list={unconfirmedTech}
                multiList={multiList}
                handleClick={handleClick}
                setDebounceTech={setDebounceTech}
              />
            </>
            :
            <TechListItem>No technology in selected radars</TechListItem>
        }



      </TechListWrapper>
    </StyledTechList>
  );
}

export default TechList;


const StyledTechList = styled(motion.ol)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: ${(props) => props.theme.default.primaryColor};
  min-width: 300px;
  max-width: 300px;
  overflow-y: auto;
  height: 100%;
  position: relative;

  h5 {
    margin: 0 .5em;
  }

  @media (max-width: 768px) {
    min-width: 100vw;
    max-width: 100vw;
    padding: 1em;
    padding-bottom: 5em;
    transition: min-height 500ms ease-out, max-height 500ms ease-out;

    ${ props => props.fullSize ? `
    
    min-height: 100vh;
    max-height: 100vh;
    ` : `
    
    min-height: 40vh;
    max-height: 40vh;
    `};
  }
`;

const ToggleHeight = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 15px;
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
width: 100%;
display: flex;
justify-content: center;
align-items: center;
padding: 0 10px;

button {
  width: 100%;
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

export const TechListItem = styled(motion.li)`
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
