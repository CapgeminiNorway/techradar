import { API, graphqlOperation } from 'aws-amplify';
import * as types from './redux/types/radar.type';
import { useEffect } from 'react';
import * as s from './graphql/subscriptions';
import { useDispatch } from 'react-redux';
import { SET_IS_LOADING } from './redux/types/gui.type';

export const useGraphQLSubscription = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const onCreateTechSub = API.graphql(graphqlOperation(s.onCreateTech)).subscribe({
      next: (data) => {
        console.log(data);
        const {
          value: {
            data: { onCreateTech },
          },
        } = data;
        dispatch({ type: types.ADD_TO_TECH_LIST, payload: onCreateTech });
        dispatch({ type: SET_IS_LOADING, payload: false });
      },
    });
    const onDeleteTechSub = API.graphql(graphqlOperation(s.onDeleteTech)).subscribe({
      next: (data) => {
        console.log(data);
        const {
          value: {
            data: { onDeleteTech },
          },
        } = data;
        dispatch({ type: types.REMOVE_FROM_TECH_LIST, payload: onDeleteTech });
        dispatch({ type: SET_IS_LOADING, payload: false });
      },
    });
    const onCreateRadarSub = API.graphql(graphqlOperation(s.onCreateRadar)).subscribe({
      next: (data) => {
        console.log(data);
        const {
          value: {
            data: { onCreateRadar },
          },
        } = data;
        dispatch({ type: types.MERGE_ALL_RADARS, payload: [onCreateRadar] });
        dispatch({ type: SET_IS_LOADING, payload: false });
      },
    });
    const onDeleteRadarSub = API.graphql(graphqlOperation(s.onDeleteRadar)).subscribe({
      next: (data) => {
        console.log(data);
        const {
          value: {
            data: { onDeleteRadar },
          },
        } = data;
        dispatch({ type: types.REMOVE_FROM_ALL_RADARS, payload: onDeleteRadar });
        dispatch({ type: SET_IS_LOADING, payload: false });
      },
    });

    const onUpdateTechSub = API.graphql(graphqlOperation(s.onUpdateTech)).subscribe({
      next: (data) => {
        console.log(data);
        const {
          value: {
            data: { onUpdateTech },
          },
        } = data;
        dispatch({ type: types.UPDATE_TECH_IN_LIST, payload: onUpdateTech });
        dispatch({ type: SET_IS_LOADING, payload: false });
      },
    });

    return () => {
      onCreateTechSub.unsubscribe();
      onDeleteTechSub.unsubscribe();
      onCreateRadarSub.unsubscribe();
      onDeleteRadarSub.unsubscribe();
      onUpdateTechSub.unsubscribe();
    };
  }, [dispatch]);
};
