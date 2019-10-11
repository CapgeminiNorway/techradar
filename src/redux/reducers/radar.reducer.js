import * as types from '../types/radar.type';
import {
  deleteItemFromList,
  updateTechFromList,
  addItemToList,
  dynamicSortMultiple,
} from '../../function.helper';

export const initialState = {
  currentRadarList: [],
  allRadars: [],
  techList: [],
  currentTech: null,
  unconfirmedTechList: [],
  confirmedTechList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_TECH:
      return {
        ...state,
        currentTech: action.payload,
      };
    case types.SET_TECH_LIST:
      return {
        ...state,
        techList: action.payload.sort(dynamicSortMultiple('quadrant', 'ring')) || [],
        unconfirmedTechList: action.payload.filter((tech) => {
          return !tech.confirmed;
        }),
        confirmedTechList: action.payload.filter((tech) => {
          return tech.confirmed;
        }),
        currentTech: action.payload[0],
      };
    case types.ADD_TO_TECH_LIST:
      return {
        ...state,
        techList: addItemToList(state.techList, action.payload),
      };
    case types.UPDATE_TECH_IN_LIST:
      return {
        ...state,
        techList: updateTechFromList(state.techList, action.payload),
      };
    case types.REMOVE_TECH_BY_RADAR:
      return {
        ...state,
        techList: state.techList.filter((tech) => tech.radarId !== action.payload),
        currentTech:
          state.currentTech && state.currentTech.radarId === action.payload
            ? null
            : state.currentTech,
      };
    case types.REMOVE_FROM_TECH_LIST:
      return {
        ...state,
        techList: deleteItemFromList(state.techList, action.payload),
      };
    case types.MERGE_TECH_LIST:
      return {
        ...state,
        techList: state.techList.concat(action.payload),
      };
    case types.SET_ALL_RADARS:
      return {
        ...state,
        allRadars: action.payload,
      };
    case types.MERGE_ALL_RADARS:
      return {
        ...state,
        allRadars: [...state.allRadars, ...action.payload],
      };
    case types.SET_CURRENT_RADAR:
      return {
        ...state,
        currentRadarList: action.payload,
        techList: state.techList.filter((tech) => tech.radarId !== action.payload.id),
      };
    case types.REMOVE_FROM_ALL_RADARS:
      return {
        ...state,
        currentRadarList: deleteItemFromList(state.currentRadarList, action.payload),
        allRadars: deleteItemFromList(state.allRadars, action.payload),
      };
    case types.REMOVE_FROM_CURRENT_RADAR:
      return {
        ...state,
        currentRadarList: deleteItemFromList(state.currentRadarList, action.payload),
      };
    case types.ADD_TO_CURRENT_RADAR:
      return {
        ...state,
        currentRadarList: state.currentRadarList.concat([action.payload]),
      };
    default:
      return state;
  }
};

export default reducer;
