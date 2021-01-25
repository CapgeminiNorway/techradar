import React, { useState } from "react";
import styled from "styled-components";
import { QUADRANTS } from "../App";
import { getQuadrant, dynamicSortMultiple } from "../function.helper";
import { stylesTheme } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTech } from "../redux/actions/radar.action";
import { setModal } from "../redux/actions/gui.action";
import { MODAL_TYPES } from "./commons/Modal";
import { TechListItem } from "./TechList";
import { Grow } from "./commons/styles";

const SortBar = ({ list, handleClick, multiList }) => {
  const dispatch = useDispatch();
  const { currentTech, currentRadarList } = useSelector(state => state.radar);

  const [searchString, setSearchString] = React.useState("");

  const QUADRANT = "quadrant",
    RING = "ring",
    NAME = "name";

  const [currentFilters, setCurrentFilters] = useState([QUADRANT, RING, NAME]);

  const handleSelectTech = _tech => {
    if (handleClick) {
      handleClick(_tech);
    } else {
      dispatch(setCurrentTech(_tech));
      dispatch(setModal(MODAL_TYPES.TECH_FORM));
    }
  };

  const getIsCurrent = tech => {
    if (multiList) {
      return multiList.indexOf(tech) !== -1;
    } else {
      return currentTech && currentTech.id === tech.id;
    }
  };

  const renderTechList = _techList => {
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
          onClick={() => handleSelectTech(tech)}
        >
          <b>{tech.name}</b>
          {currentRadarList.length > 1 && <p>{tech.radarId}</p>}

          <RingLabel>{tech.ring}</RingLabel>
        </TechListItem>
      );
    });
  };

  const setFilter = filter => {
    const i = currentFilters.indexOf(filter);
    if (i > 0) {
      currentFilters.splice(i, 1);
      currentFilters.unshift(filter);
      setCurrentFilters([...currentFilters]);
    }
  };

  const handleSearch = e => {
    setSearchString(e.target.value);
  };

  const returnSearch = _techList => {
    if (!searchString.length) return _techList;
    return _techList.filter(t => t.name.includes(searchString));
  };

  const returnSort = _techList => {
    return _techList.sort(dynamicSortMultiple(currentFilters[0], currentFilters[1]));
  };

  return (
    <>
      <StyledFilterBar>
        <label>Sort:</label>
        <Grow>
          <FilterButton setFilter={setFilter} buttonString={currentFilters[0]} current />
          <FilterButton setFilter={setFilter} buttonString={currentFilters[1]} current />
          <FilterButton setFilter={setFilter} buttonString={currentFilters[2]} />
        </Grow>
      </StyledFilterBar>
      <StyledFilterBar>
        <label>Search:</label>
        <Grow>
          <SortInput placeholder="technology search ..." onChange={handleSearch} />
        </Grow>
      </StyledFilterBar>
      {renderTechList(returnSearch(returnSort(list)))}
    </>
  );
};

export default React.memo(SortBar);

const FilterButton = ({ setFilter, buttonString, current }) => {
  const StyledFilterButton = styled.button`
    background: ${props =>
      props.current ? props.theme.default.lightColor : props.theme.default.opaqueWhite};
    color: ${props =>
      props.current ? props.theme.default.fontColor : props.theme.default.lightColor};
  `;
  return (
    <StyledFilterButton
      key={buttonString}
      onClick={() => setFilter(buttonString)}
      current={current}
    >
      {buttonString}
    </StyledFilterButton>
  );
};

const SortInput = styled.input`
  width: 90%;
  background: transparent;
  border: none;
  border-bottom: 3px solid white;
  color: white;
  padding: 4px 6px;
  margin: 10px;

  ::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const RingLabel = styled.label`
  background: ${props => props.theme.default.lightColor};
  color: ${props => props.theme.default.fontColor};
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
  margin: 0.3em 0;
  label {
    font-size: 14px;
    padding: 0 0.5em;
  }
  button {
    padding: 0.5em;
    width: 70px;

    @media (max-width: 768px) {
      padding: 0.5em;
    }
  }
`;
