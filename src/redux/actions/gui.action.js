import * as types from '../types/gui.type';

export const getUrlRadars = (updatedAllRadarList) => (dispatch) => {
  // const storedUrlRadarIdList = window.location.search.split('radar=')[1];
  // const parseStoredUrlRadarIdList = storedUrlRadarIdList
  //   ? JSON.parse(decodeURIComponent(storedUrlRadarIdList))
  //   : [];
  // if (parseStoredUrlRadarIdList && parseStoredUrlRadarIdList.length) {
  //   parseStoredUrlRadarIdList.map((radarId) => {
  //     return updatedAllRadarList.filter((allRadarItem) => {
  //       if (radarId === allRadarItem.id) {
  //         return dispatch(toggleRadar(allRadarItem));
  //       } else return null;
  //     });
  //   });
  // }
};

export const createRadarUrl = (radarList, router) => {
  // const radarIdList = radarList.map((radar) => {
  //   return radar.id;
  // });
  // console.log(radarIdList);
  // router.history.push({
  //   pathname: router.location.pathname,
  //   search: `?radar=${JSON.stringify(radarIdList)}`,
  // });
};

export const setModal = (Component) => (dispatch) => {
  dispatch({ type: types.SET_MODAL, payload: Component });
};

export const toggleUserWarning = (text) => (dispatch) => {
  dispatch({ type: types.SHOW_USER_WARNING, payload: text });
  setTimeout(() => {
    dispatch({ type: types.SHOW_USER_WARNING, payload: '' });
  }, 500);
};
