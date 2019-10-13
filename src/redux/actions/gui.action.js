import * as types from '../types/gui.type';
import { toggleRadar, setCurrentTech } from './radar.action';

export const getUrlRadars = (updatedAllRadarList) => (dispatch) => {
  const storedUrlRadarIdList = window.location.hash.split('radar=')[1];
  const parseStoredUrlRadarIdList = storedUrlRadarIdList
    ? JSON.parse(decodeURIComponent(storedUrlRadarIdList))
    : [];
  if (parseStoredUrlRadarIdList && parseStoredUrlRadarIdList.length) {
    parseStoredUrlRadarIdList.map((radarId) => {
      return updatedAllRadarList.filter((allRadarItem) => {
        if (radarId === allRadarItem.id) {
          return dispatch(toggleRadar(allRadarItem));
        } else return null;
      });
    });
  }
};

export const createRadarUrl = (radarList, router) => {
  const radarIdList = radarList.map((radar) => {
    return radar.id;
  });
  console.log(radarIdList);
  router.history.push({
    pathname: router.location.pathname,
    search: `?radar=${JSON.stringify(radarIdList)}`,
  });
};

export const setModal = (modalType) => (dispatch) => {
  if (!modalType) {
    dispatch(setCurrentTech(null))
  }
  dispatch({ type: types.SET_MODAL, payload: modalType });
};

export const toggleUserWarning = (text) => (dispatch) => {
  dispatch({ type: types.SHOW_USER_WARNING, payload: text });
  setTimeout(() => {
    dispatch({ type: types.SHOW_USER_WARNING, payload: '' });
  }, 500);
};
