import React from 'react';
import styled from 'styled-components';
import { useWindowSize } from '../../helper';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../redux/actions/gui.action';
import { signOut } from '../../redux/actions/user.action';
import { MODAL_TYPES } from './Modal';

const NavigationBar = withRouter(({ history }) => {
  const windowSize = useWindowSize();

  if (windowSize.width > 700) {
    return (
      <StyledNavBar>
        <NavIcon onClick={() => history.push('/')}>Tech Radar</NavIcon>
        <div>
          <Buttons history={history} />
        </div>
      </StyledNavBar>
    );
  } else {
    return (
      <>
        <MobileNavButton>
          <Buttons history={history} />
        </MobileNavButton>
      </>
    );
  }
});

const Buttons = React.memo(({ history }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const openAddTechModal = () => {
    dispatch(setModal(MODAL_TYPES.TECH_FORM));
  };

  const openManageRadar = () => {
    dispatch(setModal(MODAL_TYPES.RADAR_FORM));
  };

  const openAbout = () => {
    dispatch(setModal(MODAL_TYPES.ABOUT));
  };

  const toRadar = () => {
    history.push('/edit/');
  };

  const toWordCloud = () => {
    history.push('/edit/word-cloud');
  };

  return (
    <>
      <button onClick={toRadar}>> Radar</button>
      <button onClick={toWordCloud}>> Word Cloud</button>
      <button onClick={openAddTechModal}>+ Add Tech</button>
      {currentUser && currentUser.isAdmin && <button onClick={openManageRadar}>+ Add Radar</button>}
      <button onClick={openAbout}>? About</button>
      <button onClick={() => dispatch(signOut())}>Sign out</button>
    </>
  );
});

export default React.memo(NavigationBar);

export const NavIcon = styled.div`
  display: flex;
  align-items: center;
  font-family: monospace;
  font-size: 2em;
  color: ${(props) => props.theme.default.lightColor};
`;

const MobileNavButton = styled.nav`
  min-width: 100vw;
  max-width: 100vw;
  min-height: 80px;
  max-height: 80px;
  bottom: 0;
  z-index: 1000;
  position: fixed;
  background: ${(props) => props.theme.default.backgroundColor};
  display: flex;

  a,
  button {
    width: calc(100% / 6); 
    flex-grow: 1;
    border-radius: 0;
    color: ${(props) => props.theme.default.lightColor};
  }
`;

export const StyledNavBar = styled.nav`
  background-color: ${(props) => props.theme.default.primaryColor};
  display: flex;
  width: 100%;
  padding: 0.5em;
  justify-content: space-between;
  align-items: center;
  height: 5vh;

  a,
  select,
  button {
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
  }
`;
