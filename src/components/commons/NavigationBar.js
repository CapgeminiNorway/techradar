import React from 'react';
import styled from 'styled-components';
import { useWindowSize, downloadSVG } from '../../helper';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setModal, toggleUserWarning } from '../../redux/actions/gui.action';
import { signOut } from '../../redux/actions/user.action';
import { MODAL_TYPES } from './Modal';
import { ReactComponent as AboutSvg } from "../../assets/menu/info.svg";
import { ReactComponent as UsersSvg } from "../../assets/menu/users.svg";
import { ReactComponent as RadarSvg } from "../../assets/menu/radar.svg";
import { ReactComponent as LogoutSvg } from "../../assets/menu/logout.svg";
import { ReactComponent as AddSvg } from "../../assets/menu/add.svg";
import { convertJsonToExcel } from '../../function.helper';

const NavigationBar = withRouter(({ history }) => {
  const windowSize = useWindowSize();
  const { currentRadarList, techList } = useSelector((state) => state.radar);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { ModalComponent } = useSelector((state) => state.gui);

  
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

  const openAddTechModal = () => {

    if (ModalComponent === MODAL_TYPES.TECH_FORM) dispatch(setModal(null));
    else dispatch(setModal(MODAL_TYPES.TECH_FORM));  };

  const openManageRadar = () => {
    if (ModalComponent === MODAL_TYPES.RADAR_FORM) dispatch(setModal(null));
    else dispatch(setModal(MODAL_TYPES.RADAR_FORM));
  };

  const openAbout = () => {
    if (ModalComponent === MODAL_TYPES.ABOUT) dispatch(setModal(null));
    else dispatch(setModal(MODAL_TYPES.ABOUT));
  };

  // const toRadar = () => {
  //   history.push('/edit/');
  // };

  // const toWordCloud = () => {
  //   history.push('/edit/word-cloud');
  // };

  const toUserManagement = () => {
    if (ModalComponent === MODAL_TYPES.USER_MANAGEMENT) dispatch(setModal(null));
    else dispatch(setModal(MODAL_TYPES.USER_MANAGEMENT));  
  };
  
  if (windowSize.width > 768) {
    return (
      <StyledNavBar>
        <NavIcon onClick={() => history.push('/')}>Tech Radar
        </NavIcon>
        <button className="web-about" onClick={openAbout}>About</button>

        <DesktopWrapper>
          <div>
            <button onClick={openAddTechModal}>Add Tech</button>
            {currentUser && currentUser.isAdmin && <button onClick={openManageRadar}>Add radar</button>}
            {currentUser && currentUser.isAdmin && <button onClick={toUserManagement}>User management</button>}
            <button onClick={downloadRadarSvg}>Download SVG</button>
            <button onClick={downloadCSV}>Download CSV</button>
            <button onClick={() => dispatch(signOut())}>Sign out</button>
          </div>
        </DesktopWrapper>
      </StyledNavBar>
    );
  } else {
    return (
      <>
        <StyledNavBar>
          <NavIcon onClick={() => history.push('/')}>Tech Radar</NavIcon>
          <div>

          <MobileButton topBar current={ModalComponent === MODAL_TYPES.ABOUT} onClick={openAbout}><AboutSvg/></MobileButton>
          <MobileButton topBar onClick={() => dispatch(signOut())}><LogoutSvg /></MobileButton>
          </div>

        </StyledNavBar>
        <MobileNavWrapper>
          {currentUser && currentUser.isAdmin && <MobileButton current={ModalComponent === MODAL_TYPES.USER_MANAGEMENT} onClick={toUserManagement}><UsersSvg /></MobileButton>}
          <MobileButton current={ModalComponent === MODAL_TYPES.TECH_FORM} onClick={openAddTechModal}><AddSvg /></MobileButton>
          {currentUser && currentUser.isAdmin && <MobileButton current={ModalComponent === MODAL_TYPES.RADAR_FORM} onClick={openManageRadar}><RadarSvg /></MobileButton>}
        </MobileNavWrapper>
      </>
    );
  }
});

export default React.memo(NavigationBar);

export const MobileButton = styled.button`


background: ${ props => props.current && props.theme.default.primaryColor};

:last-child {
  border-right: none;
}

svg {
  width: 25px;
  height: 25px;
}


${ props => props.topBar ? `
  padding: 0;
  margin-left: 20px; 

  svg {
    width: 20px;
    height: 20px;
  }
` : `

border-top: 1px solid white;
border-right: 1px solid white;
`}
`;

export const NavIcon = styled.div`
  display: flex;
  align-items: center;
  font-family: monospace;
  color: ${(props) => props.theme.default.lightColor};
  overflow: hidden;
  white-space: nowrap;
  font-size: 2em;


  @media (max-width: 768px) {
    font-size: 1.2em;
  }

`;

export const RouteButton = styled.button`
    background: transparent;
    color: white;
    border-bottom: 3px solid white;
    margin: 0 5px;
    font-weight: 600;
    padding: 0 6px 0 0;
    text-align: center;
    cursor: pointer;
`
const MobileNavWrapper = styled.nav`
  min-width: 100vw;
  max-width: 100vw;
  min-height: 60px;
  max-height: 60px;
  bottom: 0;
  z-index: 1000;
  position: fixed;
  background: ${(props) => props.theme.default.backgroundColor};
  display: flex;

  > div {
    width: 100%;
    display: flex;
  }

  a,
  button {
    width: calc(100% / 6); 
    flex-grow: 1;
    border-radius: 0;
    color: ${(props) => props.theme.default.lightColor};
  }
`;

export const DesktopWrapper = styled.div`
  width: calc(100% - 300px);
  display: flex;
  justify-content: flex-end;

  
  button {
    padding: 8px 12px;
    border-radius: 3px;
    font-weight: 600;
    margin-right: 5px;
    color: ${(props) => props.theme.default.primaryColor};
    background: ${(props) => props.theme.default.lightColor};
    border: none;
    cursor: pointer;

    
  @media (max-width: 932px) {
    padding: 4px 6px;
  }

    :hover {
      color: ${(props) => props.theme.default.lightColor};
      background: ${(props) => props.theme.default.primaryColor};
    }
  }

  > div {
    display: flex;
    flex-wrap: nowrap;
  }
`
export const StyledNavBar = styled.nav`
  background-color: ${(props) => props.theme.default.primaryColor};
  display: flex;
  width: 100%;
  padding: 0 1em;
  justify-content: space-between;
  align-items: center;
  min-height: 5vh;
  max-height: 5vh;

  
  .web-about {
    padding: 8px 12px;
    border-radius: 3px;
    font-weight: 600;
    margin-right: 5px;
    color: ${(props) => props.theme.default.primaryColor};
    background: ${(props) => props.theme.default.lightColor};
    border: none;
    cursor: pointer;
    margin-left: 1em;
  }

`;
