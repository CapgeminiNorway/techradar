import * as types from '../types/radar.type';
import { API, graphqlOperation } from 'aws-amplify';
import * as helper from '../../function.helper';
import * as q from '../../graphql/queries';
import { getRadarAllTech } from '../../graphql/custom';
import * as m from '../../graphql/mutations';
import { getUrlRadars, toggleUserWarning, setModal } from './gui.action';
import { SET_IS_LOADING } from '../types/gui.type';

export const getToggledRadarTech = (radar, nextToken = null, prevRadarTechList = []) => async (
  dispatch,
) => {
  try {
    const getRadarListResult = await API.graphql(
      graphqlOperation(getRadarAllTech, {
        radarId: radar.id,
        nextToken: nextToken,
      }),
    );
    const radarResult = getRadarListResult.data.listRadars.items[0];
    const radarTechList = radarResult.techList;
    const updatedRadarTechList = prevRadarTechList.concat(radarTechList.items);

    // if (radarTechList.nextToken)
    //   await getToggledRadarTech(radar, radarTechList.nextToken, updatedRadarTechList);
    // else {
    dispatch({ type: types.MERGE_TECH_LIST, payload: updatedRadarTechList });
    console.log(radarResult);
    return radarResult;
    // }
  } catch (err) {
    console.error(err);
  }
};

export const toggleRadar = (radar) => (dispatch, getState) => {
  const { currentRadarList } = getState().radar;

  const index = helper.getObjectIndexById(currentRadarList, radar.id);
  dispatch({ type: SET_IS_LOADING, payload: true });

  if (index !== -1) {
    dispatch({ type: types.REMOVE_TECH_BY_RADAR, payload: radar.id });
    dispatch({ type: types.REMOVE_FROM_CURRENT_RADAR, payload: radar });
  } else {
    dispatch({ type: types.ADD_TO_CURRENT_RADAR, payload: radar });
    return dispatch(getToggledRadarTech(radar));
  }
};

// GraphQL handler functions

export const updateTech = (tech) => async (dispatch, getState) => {
  const { currentUser } = getState().user;

  const updTechObj = {
    ...tech,
    confirmed: currentUser.isAdmin,
  };
  dispatch({ type: SET_IS_LOADING, payload: true });

  try {
    await API.graphql(graphqlOperation(m.updateTech, { input: updTechObj }));
    dispatch(setModal(null))
    if (!currentUser.isAdmin) {
      dispatch(toggleUserWarning(`Updated ${tech.name}, sent to Admin for review!`));
    } else {
      dispatch(toggleUserWarning(`Confirmed Technology: ${tech.name}`));
    }
  } catch (err) {
    dispatch(toggleUserWarning('Network error!'));
  }
};

export const silentlyDeleteDupeTech = (id) => async (dispatch) => {
  dispatch({ type: SET_IS_LOADING, payload: true });

  try {
    await API.graphql(graphqlOperation(m.deleteTech, { input: { id: id } }));
  } catch (err) {
    console.error(err);
  }
};

export const silentlyConfirmTech = (unconfirmedTech) => async (dispatch, getState) => {
  const { currentUser } = getState().user;

  if (!currentUser.isAdmin) {
    return alert('Only administrators can confirm technology');
  }
  const conf = window.confirm(
    'Are you sure you want to confirm all technology at once?',
  );
  if (!conf) return null;

  dispatch({ type: SET_IS_LOADING, payload: true });

  unconfirmedTech.forEach( async tech => {
    const updTechObj = {
      ...tech,
      confirmed: currentUser.isAdmin,
    };
    try {
      await API.graphql(graphqlOperation(m.updateTech, { input: updTechObj }));
    } catch (err) {
      console.error(err);
    }
  })

 
};

export const deleteRadar = (radar) => async (dispatch, getState) => {
  const { currentUser } = getState().user;
  const { techList } = getState().radar;

  if (!currentUser.isAdmin) {
    return alert('Only administrators can delete tech');
  }
  const conf = window.confirm(
    'Are you sure to delete this radar and all corresponding technology?',
  );
  if (!conf) return null;

  try {
    await API.graphql(graphqlOperation(m.deleteRadar, { input: { id: radar.id } }));

    const removeFromSelected = [];

    techList.map(async (tech) => {
      if (tech.radarId === radar.id) {
        removeFromSelected.push(tech);
        await dispatch(silentlyDeleteDupeTech(tech.id));
      } else return null;
    });

    dispatch({ type: types.REMOVE_TECH_BY_RADAR, payload: radar.id });

    dispatch(toggleUserWarning(`Radar ${radar.id} and all corresponding technology deleted`));
  } catch (error) {
    dispatch(toggleUserWarning('Network error!'));
  }
};

export const deleteTech = (tech) => async (dispatch, getState) => {
  const { currentUser } = getState().user;

  if (!currentUser.isAdmin) {
    return alert('Only administrators can delete tech');
  }

  const conf = window.confirm('Are you sure to delete this technology?');
  dispatch({ type: SET_IS_LOADING, payload: true });

  if (!conf) return null;

  try {
    await API.graphql(graphqlOperation(m.deleteTech, { input: { id: tech.id } }));
    dispatch(toggleUserWarning(`Deleted Technology: ${tech.name}`));
    dispatch({ type: types.SET_CURRENT_TECH, payload: null });
    dispatch(setModal(null));
  } catch (err) {
    dispatch(toggleUserWarning('Network error!'));
  }
};

export const addTech = (newTechObj) => async (dispatch, getState) => {
  const { currentUser } = getState().user;
  const { techList } = getState().radar;
  dispatch({ type: SET_IS_LOADING, payload: true });

  const _newTechObj = {
    ...newTechObj,
    url: helper.checkLengthAndSetNull(newTechObj.url),
    description: helper.checkLengthAndSetNull(newTechObj.description),
    confirmed: currentUser.isAdmin,
  };

  let duplicate = false;

  techList.length &&
    techList.map((technology) => {
      if (
        technology.name.toLowerCase() === newTechObj.name.toLowerCase() &&
        technology.radarId === newTechObj.radarId
      ) {
        duplicate = true;
        const conf = window.confirm(
          `${newTechObj.name} already exists by name. Do you want to update?`,
        );
        if (!conf) return null;
        return updateTech({ ...newTechObj, id: technology.id });
      } else return null;
    });

  if (duplicate) return null;
  dispatch({ type: SET_IS_LOADING, payload: true });

  try {
    await API.graphql(graphqlOperation(m.createTech, { input: _newTechObj }));
    if (!currentUser.isAdmin) {
      dispatch(toggleUserWarning(`Great! Sent ${newTechObj.name} for review`));
    } else {
      dispatch(toggleUserWarning('Technology added and confirmed'));
    }
  } catch (err) {
    dispatch(toggleUserWarning(getNetworkErrMsg(err)));
  }
};

export const setCurrentTech = (tech) => (dispatch) => {
  dispatch({ type: types.SET_CURRENT_TECH, payload: tech });
};
export const getNetworkErrMsg = (err) => {
  try {
    return err.errors[0].message;
  } catch (err) {
    return 'Network error';
  }
};

export const addRadar = (radarForm) => async (dispatch) => {
  const newRadar = {
    id: radarForm.id,
    description: helper.checkLengthAndSetNull(radarForm.description),
    isPublic: radarForm.isPublic,
  };
  dispatch({ type: SET_IS_LOADING, payload: true });

  try {
    console.log(newRadar);
    const radar = await API.graphql(graphqlOperation(m.createRadar, { input: newRadar }));
    dispatch(toggleUserWarning(`Created radar ${newRadar.id}`));
    dispatch({type: types.SET_CURRENT_RADAR, payload: []});
    dispatch({type: types.SET_CURRENT_TECH, payload: []})
    return radar;
  } catch (err) {
    dispatch(toggleUserWarning(getNetworkErrMsg(err)));
  }
};

export const updateTechRadar = (newRadar) => async (dispatch, getState) => {
  const { techList } = getState().radar;

  try {
    techList.map(async (tech) => {
      await API.graphql(
        graphqlOperation(m.createTech, {
          input: { ...tech, techRadarId: newRadar.id, radarId: newRadar.id, id: null },
        }),
      );
    });
    dispatch(toggleRadar(newRadar));
  } catch (err) {
    dispatch(toggleUserWarning(getNetworkErrMsg(err)));
  }
};

export const getAllRadars = (prevRadarList = [], hasNextToken = null) => async (dispatch) => {
  try {
    const getRadarListResult = await API.graphql(
      graphqlOperation(q.listRadars, { nextToken: hasNextToken }),
    );
    const radarResult = getRadarListResult.data.listRadars;

    const updatedAllRadarList = prevRadarList.concat(radarResult.items);
    dispatch({ type: SET_IS_LOADING, payload: true });

    if (radarResult.nextToken) {
      await dispatch(getAllRadars(updatedAllRadarList, radarResult.nextToken));
    } else {
      dispatch({ type: types.SET_ALL_RADARS, payload: updatedAllRadarList });
      dispatch(getUrlRadars(updatedAllRadarList));
      dispatch({ type: SET_IS_LOADING, payload: false });
    }
  } catch (err) {
    console.error(err);
  }
};
