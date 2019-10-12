import React from 'react';
import Radar from '../Radar';
import { API } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { dynamicSort } from '../../function.helper';
import { NavIcon, StyledNavBar } from '../commons/NavigationBar';
import { Route, Switch } from 'react-router-dom';

/**
 * This page will be implemented as soon as support for multiple API's are available.
 *
 * https://github.com/aws-amplify/amplify-cli/issues/335
 *
 * Thanks for the feature request. We will use this ticket to track this item as we prioritize. It would be nice to allow multiple APIs in one project.
 * The goto use case to me is to allow a publically available API with IAM auth enabled and then a user based API with user pools enabled in the same project.
 * --------+
 * This use case you're describing is what got me here. I want to add data to a database which should be publically available without logging in with Cognito.
 * Add data while logged in and read it from anywhere. Is there any other thread since this got closed, or will it be re-opened when feature is being worked on?
 */
const PublicRadarPage = ({ history, match }) => {
  const [error, setError] = React.useState(null);
  const [publicRadars, setPublicRadars] = React.useState([]);
  const [currentRadar, setCurrentRadar] = React.useState(null);

  // TODO: Returns no radar, figure out req config
  const getPublicRadars = React.useCallback(async () => {
    try {
      const res = await API.get('techradarREST', '/public-radar');

      if (res.error) {
        setError(`Network error: ${res.error}`);
      }
      if (match.params.radarId) {
        for (let i = 0; i < res.length; i++) {
          if (res[i].id === match.params.radarId) return setCurrentRadar(res[i]);
          else {
            setError(`No radar with name ${match.params.radarId}`);
          }
        }
      }
      setPublicRadars(res);
      console.log(res);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  }, [match]);

  React.useEffect(() => {
    getPublicRadars();
  }, [getPublicRadars]);

  const selectRadar = (radar, history) => {
    setCurrentRadar(radar);
    history.push('/' + radar.id);
  };

  const renderPublicPage = () => {
    if (error) {
      return (
        <ErrorWrapper>
          <h1>An error has occured</h1>
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </ErrorWrapper>
      );
    } else if (!currentRadar && !publicRadars.length) {
      return (
        <SpinnerContainer>
          <span className="app-logo" />
        </SpinnerContainer>
      );
    } else {
      return (
        <Switch>
          <Route
            path="/:radarId"
            render={() => (
              <>
                <CurrentRadarMenu>
                  <h1>{currentRadar.id.replace(/-/g, ' ')}</h1>
                  <p>{currentRadar.description}</p>
                </CurrentRadarMenu>
                <Radar publicPage={true} techList={currentRadar.techList} />
              </>
            )}
          />
          <Route
            path="/"
            render={(props) => (
              <PublicRadarContainer>
                {Array.isArray(publicRadars) &&
                  publicRadars.sort(dynamicSort('id')).map((radar) => {
                    return (
                      <PublicRadarButton
                        key={radar.id}
                        onClick={() => selectRadar(radar, props.history)}>
                        {radar.id.replace('NO-CoP', '').replace(/-/g, ' ')}
                      </PublicRadarButton>
                    );
                  })}
              </PublicRadarContainer>
            )}
          />
        </Switch>
      );
    }
  };

  const handleRoute = (route) => {
    setError(null);
    setCurrentRadar(null);
    history.push(route);
  };

  return (
    <PublicWrapper>
      {/* {JSON.stringify(publicRadars)} */}
      <StyledNavBar>
        <NavIcon onClick={() => handleRoute('/')}>Tech Radar</NavIcon>
        <div>
          {(currentRadar || error) && <button onClick={() => handleRoute('/')}>Back</button>}
          <button onClick={() => handleRoute('/edit/')}>Capgemini employee? Login here</button>
        </div>
      </StyledNavBar>

      {renderPublicPage()}
    </PublicWrapper>
  );
};

export default withRouter(PublicRadarPage);

const ErrorWrapper = styled.div`
  padding: 1em 3vw 0 3vw;
  color: ${(props) => props.theme.default.lightColor};
`;

const SpinnerContainer = styled.div`
  padding: 20vh 0;
`;
const CurrentRadarMenu = styled.div`
  color: ${(props) => props.theme.default.lightColor};
  padding: 1em 3vw 0 3vw;
`;

const PublicWrapper = styled.div`
  background: ${(props) => props.theme.default.backgroundColor};
  height: 100vh;
  width: 100vw;
`;
const PublicRadarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 1em;
  margin: 2em auto;
  padding-bottom: 2em;
  width: 90%;
  height: calc(100vh - 4em);
  @media only screen and (max-width: 890px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
`;

const PublicRadarButton = styled.button`
  padding: 2em;
  font-size: 3vw;
  font-weight: 600;
  background: ${(props) => props.theme.default.primaryColor};
  color: ${(props) => props.theme.default.lightColor};
  border-radius: 10px;
  border: 3px solid ${(props) => props.theme.default.lightColor};

  :hover {
    background: ${(props) => props.theme.default.lightColor};
    color: ${(props) => props.theme.default.primaryColor};
    border: 3px solid ${(props) => props.theme.default.primaryColor};
  }
`;
