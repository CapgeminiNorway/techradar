import * as types from '../types/radar.type';
import {
  dynamicSortMultiple,
} from '../../function.helper';
import produce from "immer";


export const initialState = {
  currentRadarList: [],
  allRadars: [],
  techList: [],
  currentTech: null,
  unconfirmedTechList: [],
  confirmedTechList: [],
};

const reducer = produce((draft = initialState, action) => {
  const { type, payload } = action;
     
  switch (type) {
    case types.SET_CURRENT_TECH:
      draft.currentTech = payload
      break
    case types.SET_TECH_LIST: {
      draft.techList = payload.sort(dynamicSortMultiple('quadrant', 'ring')) || [];
      draft.unconfirmedTechList = payload.filter((tech) => !tech.confirmed)
      draft.confirmedTechList = payload.filter((tech) => tech.confirmed)
      draft.currentTech = payload[0]
      break;
    }

    case types.ADD_TO_TECH_LIST: {
      draft.techList.push(payload)
      break
    }
    case types.UPDATE_TECH_IN_LIST: {
      draft.techList = draft.techList.map((current) => {
        if (payload.id === current.id) return payload;
        else return current
      });
      break;
    }
    case types.REMOVE_TECH_BY_RADAR: {
      draft.techList = draft.techList.filter((current) => current.radarId !== payload);
      draft.currentTech = draft.currentTech ? (draft.currentTech.radarId === payload) ? null : draft.currentTech : null;
      break;
    }
    case types.REMOVE_FROM_TECH_LIST: {
      draft.techList = draft.techList.filter((current) => current.id !== payload.id);
      break; 
    }
    case types.MERGE_TECH_LIST: {
      draft.techList = draft.techList.concat(payload)
      break;
    }
    case types.SET_ALL_RADARS: {
      draft.allRadars = payload;
      break;
    }
    case types.MERGE_ALL_RADARS: {
      draft.allRadars = draft.allRadars.concat(payload)
      break;
    }
    case types.SET_CURRENT_RADAR: {
      draft.currentRadarList = payload;
      draft.techList = draft.techList.filter( current => current.radarId !== payload.id);
      break;
    }
    case types.REMOVE_FROM_ALL_RADARS: {
      draft.currentRadarList = draft.currentRadarList.filter((current) => current.id !== payload.id);
      draft.allRadars = draft.allRadars.filter((current) => current.id !== payload.id);
      break;
    }
    case types.REMOVE_FROM_CURRENT_RADAR: {
      draft.currentRadarList = draft.currentRadarList.filter((current) => {
        return current.id !== payload.id
      })
      break;
    }
    case types.ADD_TO_CURRENT_RADAR: {
      draft.currentRadarList = draft.currentRadarList.concat([payload])
      break;
    }
    default:
      return draft;
    }
})

export default reducer;