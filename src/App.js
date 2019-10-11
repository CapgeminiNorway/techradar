import React from 'react';
import styled from 'styled-components';
import './App.css';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import { Route } from 'react-router-dom';
import AboutPage from './components/pages/About';
import RadarPage from './components/pages/RadarPage';
import WordCloudPage from './components/pages/GenerateWordCloud';
import { useAlert } from 'react-alert';
import AuthTheme from './amplifyAuthStyles';
import NavigationBar from './components/commons/NavigationBar';
import Modal from './components/commons/Modal';
import { useGraphQLSubscription } from './graphql.hook';
import { createRadarUrl, setModal } from './redux/actions/gui.action';
import { handleSetCurrentUser } from './redux/actions/user.action';
import { getAllRadars } from './redux/actions/radar.action';
import { useDispatch, useSelector } from 'react-redux';
import About from './components/pages/About';
import TechForm from './components/TechForm';
import RadarForm from './components/RadarForm';

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

  useGraphQLSubscription(dispatch);
  const alert = useAlert();

  React.useEffect(() => {
    if (currentRadarList.length) createRadarUrl(currentRadarList);
  }, [currentRadarList]);

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
      case "About": return <About />
      case "TechForm": return <TechForm />
      case "RadarForm": return <RadarForm />
      default: return null;
    }
  }
  return (
    <AppMainStyles>
      <Modal open={!!ModalComponent} toggleModal={handleToggleModal}>
        {renderModal()}
      </Modal>
      <NavigationBar />

      <Route exact path="/edit" component={RadarPage} />
      <Route path="/edit/word-cloud" component={WordCloudPage} />
      <Route path="/edit/about" component={AboutPage} />
    </AppMainStyles>
  );
};

// function withAuthenticator(Comp, includeGreetings, authenticatorComponents, federated, theme, signUpConfig) {
export default withAuthenticator(App, false, [], null, AuthTheme, {
  hiddenDefaults: ['phone_number'],
});

const AppMainStyles = styled.div`
  background-color: ${(props) => props.theme.default.backgroundColor};
  min-height: 100vh;
  color: ${(props) => props.theme.default.lightColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
`;
