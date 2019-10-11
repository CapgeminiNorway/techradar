import * as types from '../types/user.type';
import LogRocket from 'logrocket';
import { Auth } from 'aws-amplify';

export const setupLogRocket = (currentUser) => {
  LogRocket.identify(currentUser.id, {
    name: currentUser.username,
    email: currentUser.email,
    // Add your own custom user variables here, ie:
    subscriptionType: currentUser.isAdmin ? 'admin' : 'user',
  });
};

export const handleSetCurrentUser = () => (dispatch) => {
  Auth.currentAuthenticatedUser().then((user) => {
    console.log('Authenticated user: ');
    console.log(user);

    let group = '';

    console.log(user.signInUserSession.accessToken.payload);
    const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
    if (groups && groups.indexOf('admin') !== -1) {
      group = 'admin';
    } else if (groups && groups.indexOf('user') !== -1) {
      group = 'user';
    } else {
      console.log('user has no group');
    }
    const currentUser = {
      username: user.username,
      group: group,
      id: user.attributes.sub,
      isAdmin: group.toLowerCase() === 'admin',
      email: user.attributes.email,
    };
    setupLogRocket(currentUser);
    dispatch({ type: types.SET_CURRENT_USER, payload: currentUser });
  });
};

export const signOut = () => (dispatch) => {
  Auth.signOut()
    .then((data) => {
      console.log(data);
      dispatch({ type: types.SET_CURRENT_USER, payload: null });
      window.location.reload();
    })
    .catch((err) => console.log(err));
};
