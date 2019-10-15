import React from 'react';
import styled from 'styled-components';
import './App.css';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import { Route } from 'react-router-dom';
import RadarPage from './components/pages/RadarPage';
import WordCloudPage from './components/pages/GenerateWordCloud';
import { useAlert } from 'react-alert';
import AuthTheme from './amplifyAuthStyles';
import NavigationBar from './components/commons/NavigationBar';
import Modal, { MODAL_TYPES } from './components/commons/Modal';
import { useGraphQLSubscription } from './graphql.hook';
import { setModal } from './redux/actions/gui.action';
import { handleSetCurrentUser, setAllUsers } from './redux/actions/user.action';
import { getAllRadars } from './redux/actions/radar.action';
import { useDispatch, useSelector } from 'react-redux';
import About from './components/pages/About';
import TechForm from './components/TechForm';
import RadarForm from './components/RadarForm';
import { useHash } from './custom-hooks';
import UserManagement from './components/UserManagement';

if (process.env.NODE_ENV !== "production") {
  Amplify.Logger.LOG_LEVEL = "DEBUG";
}

Amplify.configure(aws_exports);

export const QUADRANTS = [
  { name: 'Techniques', color: '#4285F4' },
  { name: 'Tools', color: '#DB4437' },
  { name: 'Platforms', color: '#F4B400' },
  { name: 'Languages', color: '#0F9D58' },
];
 
const App = () => {
  const dispatch = useDispatch();
  const { currentRadarList } = useSelector((state) => state.radar);
  const { userWarning, ModalComponent } = useSelector((state) => state.gui);

  const [storedValue, setValue] = useHash();
  console.log(storedValue);


  useGraphQLSubscription(dispatch);
  const alert = useAlert();

  React.useEffect(() => {
    dispatch(setAllUsers())
  }, [dispatch])

  React.useEffect(() => {
    const radarIdList = currentRadarList.map((radar) => {
      return radar.id;
    });
    if (radarIdList.length) {
      setValue(`radar=${JSON.stringify(radarIdList)}`);
    }
  }, [currentRadarList, setValue]);

  React.useEffect(() => {
    dispatch(handleSetCurrentUser());
    dispatch(getAllRadars());
  }, [dispatch]);

  React.useEffect(() => {
    if (userWarning.length) {
      alert.show(userWarning);
    }
  }, [userWarning]);

  const handleToggleModal = (Component) => {
    dispatch(setModal(Component));
  };

  const renderModal = () => {
    switch(ModalComponent) {
      case MODAL_TYPES.ABOUT: return <About />
      case MODAL_TYPES.USER_MANAGEMENT: return <UserManagement />
      case MODAL_TYPES.TECH_FORM: return <TechForm />
      case MODAL_TYPES.RADAR_FORM: return <RadarForm />
      default: return null;
    }
  }
  return (
    <AppMainStyles>
      <Modal open={!!ModalComponent} toggleModal={handleToggleModal}>
        {renderModal()}
      </Modal>
      <NavigationBar />

    <ContentWrapper>
      <Route exact path="/edit" component={RadarPage} />
      <Route path="/edit/word-cloud" component={WordCloudPage} />
      </ContentWrapper>
    </AppMainStyles>
  );
};

// function withAuthenticator(Comp, includeGreetings, authenticatorComponents, federated, theme, signUpConfig) {
export default withAuthenticator(App, false, [], null, AuthTheme, {
  hiddenDefaults: ['phone_number'],
});

const ContentWrapper = styled.div`
  height: 95vh;
`;
const AppMainStyles = styled.div`
  overflow: hidden;
  background-color: ${(props) => props.theme.default.backgroundColor};
  height: 100vh;
  width: 100vw;
  color: ${(props) => props.theme.default.lightColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  * {
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background: ${(props) => props.theme.default.lightColor + `aa`};
      padding-top: 40px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      height: 30px;
      width: 8px;
      border: 1px solid white;
      background: ${(props) => props.theme.default.lightColor};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${(props) => props.theme.default.secondaryColor};
    }

    ::-webkit-scrollbar-track-piece {
      height: 30px;
      width: 30px;
    }
  }
`;
