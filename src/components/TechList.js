import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QUADRANTS } from '../App';
import { getQuadrant, dynamicSortMultiple } from '../function.helper';
import { useDebounce } from 'use-debounce';
import { stylesTheme } from '../index';
import TechForm from './TechForm';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTech, toggleRadar, deleteRadar } from '../redux/actions/radar.action';
import { getConfirmedTech, getUnconfirmedTech } from '../redux/selectors/radar.selector';
import { setModal } from '../redux/actions/gui.action';
import Icon, { ICON_TYPES } from '../assets/icons/IconComponent';

function TechList({ handleClick, multiList }) {
  const dispatch = useDispatch();
  const { currentRadarList, allRadars } = useSelector((state) => state.radar);
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = currentUser && currentUser.isAdmin;
  const unconfirmedTech = useSelector((state) => getUnconfirmedTech(state));
  const confirmedTech = useSelector((state) => getConfirmedTech(state));

  const [debounceTech, setDebounceTech] = useState(null);
  const [tech] = useDebounce(debounceTech, 100);

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

  return (
    <StyledTechList tabIndex={0}>
      <TechListWrapper>
        <h5>All radars:</h5> {renderRadarList(allRadars)}
      </TechListWrapper>
      <TechListWrapper>
        <h5>Unconfirmed Tech ({unconfirmedTech.length}):</h5>
        <SortBar
          list={unconfirmedTech}
          multiList={multiList}
          handleClick={handleClick}
          setDebounceTech={setDebounceTech}
        />
      </TechListWrapper>
      <TechListWrapper>
        <h5>Confirmed Tech ({confirmedTech.length}):</h5>
        <SortBar
          list={confirmedTech}
          multiList={multiList}
          handleClick={handleClick}
          setDebounceTech={setDebounceTech}
        />
      </TechListWrapper>
    </StyledTechList>
  );
}

export default TechList;

const SortBar = ({ list, handleClick, multiList }) => {
  const dispatch = useDispatch();
  const { currentTech } = useSelector((state) => state.radar);

  const QUADRANT = 'quadrant',
    RING = 'ring',
    NAME = 'name';

  const [currentFilters, setCurrentFilters] = useState([QUADRANT, RING, NAME]);

  const handleSelectTech = (_tech) => {
    if (handleClick) {
      handleClick(_tech);
    } else {
      dispatch(setModal(<TechForm key={_tech.id} existingData={_tech} />));
    }
  };

  const getIsCurrent = (tech) => {
    if (multiList) {
      return multiList.indexOf(tech) !== -1;
    } else {
      return currentTech && currentTech.id === tech.id;
    }
  };

  const renderTechList = (_techList) => {
    if (!_techList || !_techList.length) {
      return <TechListItem>No technology in selected radars</TechListItem>;
    }
    return _techList.map((tech, i) => {
      if (!tech) return null;
      return (
        <TechListItem
          key={tech.id}
          focusable
          color={stylesTheme.default.lightColor}
          backgroundColor={QUADRANTS[getQuadrant(tech.quadrant)].color}
          tabIndex={0}
          current={getIsCurrent(tech, i)}
          onClick={() => handleSelectTech(tech)}>
          {tech.name} <RingLabel>{tech.ring}</RingLabel>
        </TechListItem>
      );
    });
  };

  const setFilter = (filter) => {
    const i = currentFilters.indexOf(filter);
    if (i > 0) {
      currentFilters.splice(i, 1);
      currentFilters.unshift(filter);
      setCurrentFilters([...currentFilters]);
    }
  };

  const returnFilter = (_techList) => {
    return _techList.sort(dynamicSortMultiple(currentFilters[0], currentFilters[1]));
  };

  return (
    <>
      <StyledFilterBar>
        <label>Sort:</label>
        <div>
          <FilterButton setFilter={setFilter} buttonString={currentFilters[0]} current />
          <FilterButton setFilter={setFilter} buttonString={currentFilters[1]} current />
          <FilterButton setFilter={setFilter} buttonString={currentFilters[2]} />
        </div>
      </StyledFilterBar>
      {renderTechList(returnFilter(list))}
    </>
  );
};

const FilterButton = ({ setFilter, buttonString, current }) => {
  const StyledFilterButton = styled.button`
    background: ${(props) =>
      props.current ? props.theme.default.lightColor : props.theme.default.opaqueWhite};
    color: ${(props) =>
      props.current ? props.theme.default.fontColor : props.theme.default.lightColor};
  `;
  return (
    <StyledFilterButton
      key={buttonString}
      onClick={() => setFilter(buttonString)}
      current={current}>
      {buttonString}
    </StyledFilterButton>
  );
};

const StyledTechList = styled.ol`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: ${(props) => props.theme.default.primaryColor};
  min-width: 300px;
  max-width: 300px;
  height: 100vh;
  overflow-y: auto;

  h5 {
    margin: 1em 0;
    padding-left: 0.5em;
  }

  @media (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
    height: unset;
    padding: 1em;
    padding-bottom: 5em;
  }
`;

const RingLabel = styled.label`
  background: ${(props) => props.theme.default.lightColor};
  color: ${(props) => props.theme.default.fontColor};
  border-radius: 3px;
  margin: 0 5px;
  width: 50px;
  text-align: center;
  padding: 3px 5px;
  position: absolute;
  top: 10%;
  right: 1%;
`;

const StyledFilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1em 0;
  label {
    padding: 0.2em;

    @media (max-width: 768px) {
      margin: 0.5em 0;
    }
  }
  button {
    padding: 0.5em;
    width: 70px;
    border-radius: 3px;
    margin-left: 3px;

    @media (max-width: 768px) {
      padding: 0.5em;
      margin: 0.5em 0;
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

const TechListItem = styled.li`
  position: relative;
  padding: 5px 20px 5px 5px;
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
