export { NavigationActions, StackActions } from 'react-navigation';

export { default as Storage } from './storage';

export const delay = (time: any) => new Promise((resolve: any) => setTimeout(resolve, time));

export const createAction = (type: any) => (payload?: any) => ({ type, payload });
